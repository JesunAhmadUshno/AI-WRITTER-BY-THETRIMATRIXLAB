// Pure parsers over the prototype's raw source text. The browser feeds them Vite ?raw imports;
// repo.check.mjs feeds them the same files read from disk, so the page and the check agree.
// ponytail: regex parsing of object literals, fine for these hand-written arrays; swap for a JS parser if the shapes change.

const block = (src, start, end) => {
  const i = src.indexOf(start);
  if (i < 0) throw new Error(`missing "${start}"`);
  const j = src.indexOf(end, i + start.length);
  return src.slice(i + start.length, j);
};
const unquote = (s) => JSON.parse(`"${s}"`); // the samples are double-quoted JS strings with \n and \" escapes

export const lineCount = (src) => src.split('\n').length - (src.endsWith('\n') ? 1 : 0); // counts a final unterminated line, like awk 'END{print NR}'

// LiveDemo.jsx and WritingWorkspace.jsx share one shape: roles, tasks, sampleOutputs, a fallback, a typing timer.
export function parseGenerator(src) {
  const pairs = (b) => [...b.matchAll(/id: '(\w+)', name: '([^']+)'/g)].map((m) => ({ id: m[1], name: m[2] }));
  const roles = pairs(block(src, 'const roles = [', '];'));
  const tasks = pairs(block(src, 'const tasks = [', '];'));
  const so = block(src, 'const sampleOutputs = {', '\n  };');
  const samples = {};
  for (const r of so.split(/\n    (?=\w+: \{)/).slice(1)) {
    const role = r.match(/^(\w+): \{/)[1];
    samples[role] = {};
    for (const m of r.matchAll(/(\w+): "((?:[^"\\]|\\.)*)"/g)) samples[role][m[1]] = unquote(m[2]);
  }
  const fb = src.match(/\|\| sampleOutputs\.(\w+)\.(\w+)/);
  const timer = src.match(/\}, (\d+)\);\s*\}, (\d+)\);/); // inner setInterval period, then outer setTimeout delay
  const tpl = src.match(/const content = `([^`]*)`/);
  return {
    roles, tasks, samples,
    fallback: { role: fb[1], task: fb[2] },
    charMs: +timer[1], delayMs: +timer[2],
    template: tpl ? tpl[1].replace(/\\n/g, '\n') : null, // e.g. 'Based on your prompt: "${prompt}"\n\n${baseContent}'
  };
}

export function coverage(g) {
  const cells = g.roles.flatMap((r) => g.tasks.map((t) => ({ role: r.id, task: t.id, real: !!g.samples[r.id]?.[t.id] })));
  const real = cells.filter((c) => c.real).length;
  return { cells, real, total: cells.length };
}

// What the prototype actually shows for a role/task pick, exactly as its generateContent() resolves it.
export function resolveOutput(g, role, task, prompt = '') {
  const real = g.samples[role]?.[task];
  const base = real || g.samples[g.fallback.role][g.fallback.task];
  const text = g.template ? g.template.replace('${prompt}', prompt).replace('${baseContent}', base) : base;
  return { text, real: !!real };
}

// ChatbotWidget.jsx getResponse(): an ordered if/else chain of substring tests on the lower-cased message.
export function parseRouter(src) {
  const body = block(src, 'const getResponse = (userMessage) => {', '\n  };');
  const branches = [...body.matchAll(/if \(([^{]+)\) \{\s*return chatbotResponses\.(\w+)/g)].map((m) => ({
    reply: m[2], keywords: [...m[1].matchAll(/includes\('([^']+)'\)/g)].map((k) => k[1]),
  }));
  const fallback = body.match(/else \{\s*return chatbotResponses\.(\w+)/)[1];
  const delay = +src.match(/text: getResponse\(inputValue\)[\s\S]*?\}, (\d+)\);/)[1];
  return { branches, fallback, delay };
}

export function route(router, message) {
  const msg = message.toLowerCase();
  const hits = router.branches.map((b, i) => ({ i, reply: b.reply, kw: b.keywords.filter((k) => msg.includes(k)) })).filter((h) => h.kw.length);
  return { fired: hits[0] || null, shadowed: hits.slice(1), reply: hits[0]?.reply ?? router.fallback };
}

export function parseObjectStrings(src, start) {
  const out = {};
  for (const m of block(src, start, '\n};').matchAll(/(\w+): "((?:[^"\\]|\\.)*)"/g)) out[m[1]] = unquote(m[2]);
  return out;
}

// SignUpPage.jsx getPasswordStrength(): one point per rule, plus the label thresholds.
export function parseStrength(src) {
  const body = block(src, 'const getPasswordStrength = () => {', 'return strength;');
  const minLen = +body.match(/password\.length >= (\d+)/)[1];
  const regexes = [...body.matchAll(/if \(\/(.+?)\/\.test\(password\)\)/g)].map((m) => m[1]);
  const labels = [...block(src, 'const getPasswordStrengthText = () => {', '};').matchAll(/(?:strength <= (\d+)\) )?return '(\w+)'/g)]
    .map((m) => ({ max: m[1] === undefined ? Infinity : +m[1], label: m[2] }));
  return { minLen, regexes, labels, max: 1 + regexes.length };
}

export function strength(rules, pw) {
  const checks = [{ rule: `length >= ${rules.minLen}`, ok: pw.length >= rules.minLen }, ...rules.regexes.map((r) => ({ rule: `/${r}/`, ok: new RegExp(r).test(pw) }))];
  const score = checks.filter((c) => c.ok).length;
  return { checks, score, label: rules.labels.find((l) => score <= l.max).label };
}

export const parseRoutes = (src) => [...src.matchAll(/<Route path="([^"]+)" element=\{\s*(<ProtectedRoute>)?\s*<?(\w+)/g)]
  .map((m) => ({ path: m[1], component: m[3], guarded: !!m[2] }));

export const parseEndpoints = (src) => [...src.matchAll(/@api_router\.(get|post|put|delete)\("([^"]+)"/g)]
  .map((m) => ({ method: m[1].toUpperCase(), path: `/api${m[2] === '/' ? '/' : m[2]}` }));

export const parsePlans = (src) => [...src.matchAll(/name: '(\w+)',\s*price: '([^']+)',\s*period: '([^']+)',[\s\S]*?features: \[\s*'([^']+)'/g)]
  .map((m) => ({ name: m[1], price: m[2], period: m[3], quota: m[4] }));

// AuthContext.jsx: which sign-in paths mark the user verified (ProtectedRoute requires user.verified).
export function parseAuth(src) {
  const fn = (name) => block(src, `const ${name} = async`, '\n  };');
  const methods = ['signIn', 'signInWithGoogle', 'signInWithTwitter'].map((name) => ({ name, verified: /verified: true/.test(fn(name)) }));
  return {
    methods,
    code: src.match(/code === '(\d+)'/)[1],
    storageWrites: (src.match(/localStorage\.setItem/g) || []).length,
    acceptsAnyCredentials: /if \(email && password\)/.test(fn('signIn')),
  };
}

export const countBackendCalls = (sources) => sources.reduce((n, s) => n + (s.match(/\baxios\b|\bfetch\(/g) || []).length, 0);
