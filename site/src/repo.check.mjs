// Known-answer check, run by `npm run build` and `npm test`: parses the prototype's real source files with
// the same functions the page uses and asserts the facts the page shows. Expected values were read by hand
// from the files on this commit (and awk line counts); if the prototype changes, this fails until the page is re-checked.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as P from './parse.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const walk = (d) => fs.readdirSync(path.join(root, d), { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : e.name.endsWith('.jsx') ? [`${d}/${e.name}`] : []));

// Role x task generators
const demo = P.parseGenerator(read('frontend/src/components/LiveDemo.jsx'));
const ws = P.parseGenerator(read('frontend/src/components/dashboard/WritingWorkspace.jsx'));
assert.deepEqual(demo.roles.map((r) => r.id), ['professor', 'scientist', 'poet', 'philosopher', 'student', 'gamer']);
assert.deepEqual(ws.roles.map((r) => r.id), demo.roles.map((r) => r.id));
assert.deepEqual(demo.tasks.map((t) => t.id), ['academic', 'blog', 'email', 'creative']);
assert.deepEqual(ws.tasks.map((t) => t.id), ['academic', 'blog', 'email', 'creative', 'social', 'marketing']);
assert.deepEqual([P.coverage(demo).real, P.coverage(demo).total], [8, 24]);
assert.deepEqual([P.coverage(ws).real, P.coverage(ws).total], [4, 36]);
assert.deepEqual([demo.charMs, demo.delayMs, ws.charMs, ws.delayMs], [30, 500, 20, 1000]);
assert.deepEqual(demo.fallback, { role: 'professor', task: 'academic' });
assert.equal(demo.template, null);
assert.ok(ws.template.startsWith('Based on your prompt: "${prompt}"\n\n'));
assert.ok(demo.samples.scientist.academic.includes('(p < 0.001)'), 'unescaped sample text');
assert.ok(ws.samples.scientist.blog.includes('\n\n1. Efficiency'), 'newline escapes decoded');
// Fallback behaviour: an unscripted pick silently shows the professor/academic text.
assert.equal(P.resolveOutput(demo, 'poet', 'email').text, demo.samples.professor.academic);
assert.equal(P.resolveOutput(demo, 'poet', 'email').real, false);
assert.ok(P.resolveOutput(ws, 'gamer', 'social', 'x').text.startsWith('Based on your prompt: "x"\n\nThe paradigm shift'));

// Chatbot keyword router
const router = P.parseRouter(read('frontend/src/components/ChatbotWidget.jsx'));
assert.deepEqual(router.branches.map((b) => b.reply), ['pricing', 'features', 'demo', 'comparison', 'support', 'signup', 'roles', 'academic', 'greeting']);
assert.equal(router.branches.flatMap((b) => b.keywords).length, 24);
assert.equal(router.fallback, 'default');
assert.equal(router.delay, 1000);
assert.equal(P.route(router, 'this').reply, 'greeting'); // 'this' contains 'hi'
assert.equal(P.route(router, 'I need help picking a role').reply, 'support'); // help wins before roles
assert.deepEqual(P.route(router, 'I need help picking a role').shadowed.map((h) => h.reply), ['roles']);
assert.equal(P.route(router, 'Can I try the professor role?').reply, 'demo');
assert.equal(P.route(router, 'What does the Pro plan cost?').reply, 'pricing');
assert.equal(P.route(router, 'restart').reply, 'signup');
assert.equal(P.route(router, 'xyz').reply, 'default');
const replies = P.parseObjectStrings(read('frontend/src/mock.js'), 'export const chatbotResponses = {');
assert.deepEqual(Object.keys(replies).sort(), [...router.branches.map((b) => b.reply), 'default'].sort());

// Password strength meter
const rules = P.parseStrength(read('frontend/src/components/auth/SignUpPage.jsx'));
assert.equal(rules.minLen, 6);
assert.deepEqual(rules.regexes, ['[A-Z]', '[0-9]', '[^A-Za-z0-9]']);
assert.deepEqual([['', 0, 'Weak'], ['abcdef', 1, 'Weak'], ['Abcdef', 2, 'Fair'], ['Abcde1', 3, 'Good'], ['Abcd1!', 4, 'Strong'], ['A1!', 3, 'Good']]
  .map(([pw]) => { const s = P.strength(rules, pw); return [pw, s.score, s.label]; }),
[['', 0, 'Weak'], ['abcdef', 1, 'Weak'], ['Abcdef', 2, 'Fair'], ['Abcde1', 3, 'Good'], ['Abcd1!', 4, 'Strong'], ['A1!', 3, 'Good']]);

// Architecture
assert.deepEqual(P.parseRoutes(read('frontend/src/App.js')).map((r) => `${r.path}${r.guarded ? '*' : ''}`), ['/', '/signin', '/signup', '/verify', '/dashboard*']);
assert.deepEqual(P.parseEndpoints(read('backend/server.py')).map((e) => `${e.method} ${e.path}`), ['GET /api/', 'POST /api/status', 'GET /api/status']);
assert.deepEqual(P.parsePlans(read('frontend/src/components/PricingSection.jsx')).map((p) => `${p.name} ${p.price} ${p.quota}`),
  ['Free $0 500 words per month', 'Pro $29 50,000 words per month', 'Enterprise $99 Unlimited words']);
const auth = P.parseAuth(read('frontend/src/contexts/AuthContext.jsx'));
assert.deepEqual(auth.methods.map((m) => m.verified), [false, true, true]); // email sign-in never sets verified
assert.equal(auth.code, '123456');
assert.equal(auth.acceptsAnyCredentials, true);

// Code inventory (awk 'END{print NR}' per file on this commit; the files lack a final newline, so wc -l reads one short)
const files = walk('frontend/src/components');
const ui = files.filter((f) => f.includes('/ui/'));
const own = files.filter((f) => !f.includes('/ui/'));
assert.equal(ui.length, 46);
assert.equal(own.length, 20);
const sum = (fs_) => fs_.reduce((n, f) => n + P.lineCount(read(f)), 0);
assert.equal(P.lineCount(read('frontend/src/components/dashboard/AccountSettings.jsx')), 419);
assert.equal(P.lineCount(read('backend/server.py')), 75);
assert.equal(sum(own), 3891);
assert.equal(P.countBackendCalls([...own, 'frontend/src/App.js', 'frontend/src/contexts/AuthContext.jsx', 'frontend/src/mock.js'].map(read)), 0);
assert.equal(sum(ui) > 0, true);

console.log(`repo.check: ok (${own.length} components, ${sum(own)} lines, coverage ${P.coverage(demo).real}/${P.coverage(demo).total} and ${P.coverage(ws).real}/${P.coverage(ws).total}, ${router.branches.length} router branches)`);
