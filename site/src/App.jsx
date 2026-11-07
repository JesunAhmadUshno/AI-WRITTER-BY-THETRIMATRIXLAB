import { useState, useEffect, useId, useMemo } from 'react';
import liveDemoSrc from '../../frontend/src/components/LiveDemo.jsx?raw';
import workspaceSrc from '../../frontend/src/components/dashboard/WritingWorkspace.jsx?raw';
import chatbotSrc from '../../frontend/src/components/ChatbotWidget.jsx?raw';
import signUpSrc from '../../frontend/src/components/auth/SignUpPage.jsx?raw';
import pricingSrc from '../../frontend/src/components/PricingSection.jsx?raw';
import mockSrc from '../../frontend/src/mock.js?raw';
import appSrc from '../../frontend/src/App.js?raw';
import authSrc from '../../frontend/src/contexts/AuthContext.jsx?raw';
import serverSrc from '../../backend/server.py?raw';
import frontendPkg from '../../frontend/package.json';
import requirementsSrc from '../../backend/requirements.txt?raw';
import * as P from './parse.js';


const REPO = 'https://github.com/JesunAhmadUshno/AI-WRITTER-BY-THETRIMATRIXLAB';
const blob = (p) => `${REPO}/blob/main/${p}`;
const fmt = (n) => n.toLocaleString('en-US');
const pct = (a, b) => `${Math.round((a / b) * 100)}%`;

// ---- everything below is parsed from the repo at build time ----
const GEN = { demo: P.parseGenerator(liveDemoSrc), ws: P.parseGenerator(workspaceSrc) };
const GEN_META = {
  demo: { file: 'frontend/src/components/LiveDemo.jsx', label: 'Landing-page demo' },
  ws: { file: 'frontend/src/components/dashboard/WritingWorkspace.jsx', label: 'Dashboard workspace' },
};
const COV = { demo: P.coverage(GEN.demo), ws: P.coverage(GEN.ws) };
const ROUTER = P.parseRouter(chatbotSrc);
const REPLIES = P.parseObjectStrings(mockSrc, 'export const chatbotResponses = {');
const RULES = P.parseStrength(signUpSrc);
const ROUTES = P.parseRoutes(appSrc);
const ENDPOINTS = P.parseEndpoints(serverSrc);
const PLANS = P.parsePlans(pricingSrc);
const AUTH = P.parseAuth(authSrc);
const TESTIMONIALS = (mockSrc.split('export const testimonials = [')[1].split('\n];')[0].match(/name: "/g) || []).length;
const COMPANY_STATS = Object.keys(P.parseObjectStrings(mockSrc, 'export const companyStats = {')).length;
const FILES = __INVENTORY__.map((f) => ({ ...f, name: f.path.split('/').pop().replace('.jsx', ''), ui: f.path.includes('/ui/') })); // counted in vite.config.js
const OWN = FILES.filter((f) => !f.ui).sort((a, b) => b.lines - a.lines);
const UI = FILES.filter((f) => f.ui);
const sumLines = (fs) => fs.reduce((n, f) => n + f.lines, 0);
const BACKEND_CALLS = __COMPONENT_BACKEND_CALLS__ + P.countBackendCalls([appSrc, authSrc, mockSrc]);
const DEPS = Object.keys(frontendPkg.dependencies).length;
const PY_REQS = requirementsSrc.split('\n').filter((l) => l.trim() && !l.startsWith('#')).length;
const SCRIPTED = COV.demo.real + COV.ws.real;
const PICKS = COV.demo.total + COV.ws.total;

const SECTIONS = [['top', 'Overview', '◎'], ['coverage', 'Coverage', '▦'], ['replay', 'Replay', '▶'], ['router', 'Router', '⑂'], ['arch', 'Architecture', '⇄'], ['inventory', 'Inventory', '▥'], ['plans', 'Copy', '$'], ['honesty', 'Gaps', '✓']];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function MenuBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  return (
    <div className="menubar" role="banner">
      <span className="apple" aria-hidden="true">◆</span>
      <a className="app" href="#top">Writing Prototype Lab</a>
      <a className="m" href={blob('docs/research-review.md')}>Review</a>
      <a className="m" href={blob('README.md')}>README</a>
      <a className="m" href={blob('site/src/repo.check.mjs')}>Known-answer check</a>
      <span className="spacer" />
      <span className="status"><i /> Parsed from source</span>
      <a href={REPO}>GitHub ↗</a>
      <span className="clock">{now.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}</span>
    </div>
  );
}

function Dock() {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="dock" aria-label="Sections">
      {SECTIONS.map(([id, label, icon]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>
          <span className="ico" aria-hidden="true">{icon}</span><span className="lbl">{label}</span>
        </a>
      ))}
    </nav>
  );
}

export default function App() {
  useReveal();
  const [pick, setPick] = useState({ gen: 'demo', role: 'scientist', task: 'academic' });
  return (
    <div className="wrap">
      <MenuBar />
      <div className="glow" aria-hidden="true" />
      <Hero />
      <Coverage pick={pick} setPick={setPick} />
      <Replay pick={pick} setPick={setPick} />
      <Router />
      <Architecture />
      <Inventory />
      <Plans />
      <Honesty />
      <Dock />
      <footer>
        Every count, timing and string on this page is parsed from the prototype’s source files at build time; <code>npm run build</code> first runs <code>site/src/repo.check.mjs</code>, which re-derives them in Node and fails on any mismatch. Nothing here calls a model.
      </footer>
    </div>
  );
}

function Hero() {
  const roles = GEN.demo.roles.length;
  return (
    <header className="card hero window" id="top" data-title="TheTrimatrixLab writer — README">
      <div className="head">
        <p className="eyebrow">Engineering read · front-end prototype</p>
        <span className="pill warn">● Scripted output, no model</span>
      </div>
      <h1>A {roles}-role <em>writing-assistant</em> prototype: the UI is built, the answers are scripted.</h1>
      <p className="sub">
        The repo is a React front end (landing page, sign-in flow, dashboard with a writing workspace) plus a stock FastAPI backend.
        Pick a role and a task and it “writes”, but every answer is one of {SCRIPTED} hard-coded samples typed out by a timer.
        This page parses the source, shows exactly which picks have a sample, replays them at the repo’s own speed, and runs its real keyword router and password meter live.
      </p>
      <div className="actions">
        <a className="btn primary" href="#router">Try the keyword router</a>
        <a className="btn ghost" href="#coverage">See the coverage grid</a>
        <span className="hint">Re-derive every number with <code>cd site && npm test</code></span>
      </div>
      <div className="tiles">
        <div className="tile"><div className="num">{OWN.length}</div><div className="cap">Hand-written components, {fmt(sumLines(OWN))} lines of JSX</div></div>
        <div className="tile"><div className="num">{SCRIPTED}<small className="of">/{PICKS}</small></div><div className="cap">Role × task picks with a scripted sample; the rest fall back</div></div>
        <div className="tile"><div className="num">{ROUTER.branches.length}</div><div className="cap">Branches in the chatbot’s keyword if/else chain</div></div>
        <div className="tile"><div className="num">{BACKEND_CALLS}</div><div className="cap">HTTP calls from the UI to the backend ({ENDPOINTS.length} endpoints exist)</div></div>
      </div>
    </header>
  );
}

function Seg({ value, onChange, options, label }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map(([v, t]) => <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}>{t}</button>)}
    </div>
  );
}

function Coverage({ pick, setPick }) {
  const g = GEN[pick.gen], cov = COV[pick.gen], fb = g.fallback;
  const go = (role, task) => { setPick({ ...pick, role, task }); document.getElementById('replay')?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <section id="coverage" className="card window reveal" data-title={`${GEN_META[pick.gen].file.split('/').pop()} — role × task coverage`}>
      <p className="eyebrow">Coverage</p>
      <div className="head">
        <h2>{cov.real} of {cov.total} picks have their own text.</h2>
        <Seg label="Which generator" value={pick.gen} onChange={(gen) => setPick({ ...pick, gen })} options={[['demo', GEN_META.demo.label], ['ws', GEN_META.ws.label]]} />
      </div>
      <p className="sub" style={{ marginTop: 0 }}>
        Parsed from the <code>roles</code>, <code>tasks</code> and <code>sampleOutputs</code> arrays in <a href={blob(GEN_META[pick.gen].file)}>{GEN_META[pick.gen].file.split('/').pop()}</a>.
        Coverage is {pct(cov.real, cov.total)}. Any other pick silently shows the <b>{fb.role}/{fb.task}</b> text via <code>|| sampleOutputs.{fb.role}.{fb.task}</code>, with no message to the user.
        Click a cell to replay what the prototype would show.
      </p>
      <div className="scroll-x" style={{ overflowX: 'auto', marginTop: 16 }}>
        <table className="cov">
          <thead><tr><th scope="col">Role</th>{g.tasks.map((t) => <th scope="col" key={t.id}>{t.name}</th>)}</tr></thead>
          <tbody>
            {g.roles.map((r) => (
              <tr key={r.id}>
                <th scope="row">{r.name}</th>
                {g.tasks.map((t) => {
                  const real = !!g.samples[r.id]?.[t.id], on = pick.role === r.id && pick.task === t.id;
                  return (
                    <td key={t.id}>
                      <button type="button" className={`cell ${real ? 'real' : 'fb'} ${on ? 'on' : ''}`} onClick={() => go(r.id, t.id)}
                        aria-label={`${r.name}, ${t.name}: ${real ? 'scripted sample' : `falls back to ${fb.role}/${fb.task}`}`}>
                        {real ? '●' : '↩'}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="legend"><span><i style={{ background: 'var(--good)' }} />Own scripted sample</span><span><i style={{ background: 'var(--warn)' }} />Falls back to {fb.role}/{fb.task}</span></div>
    </section>
  );
}

function Field({ label, children }) {
  const id = useId();
  return <div className="field"><label htmlFor={id}>{label}</label>{children(id)}</div>;
}

function Replay({ pick, setPick }) {
  const g = GEN[pick.gen];
  const [prompt, setPrompt] = useState('a short note on research methods');
  const [speed, setSpeed] = useState(1);
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState('idle');
  const out = P.resolveOutput(g, pick.role, pick.task, prompt);
  const totalMs = g.delayMs + out.text.length * g.charMs;
  useEffect(() => { setShown(0); setPhase('idle'); }, [pick.gen, pick.role, pick.task]);
  useEffect(() => {
    if (!run) return;
    setShown(0); setPhase('waiting');
    let iv;
    const to = setTimeout(() => {
      setPhase('typing');
      iv = setInterval(() => setShown((n) => { if (n + 1 >= out.text.length) { clearInterval(iv); setPhase('done'); } return n + 1; }), g.charMs / speed);
    }, g.delayMs / speed);
    return () => { clearTimeout(to); clearInterval(iv); };
  }, [run]); // eslint-disable-line react-hooks/exhaustive-deps
  const roleOk = g.roles.some((r) => r.id === pick.role), taskOk = g.tasks.some((t) => t.id === pick.task);
  return (
    <section id="replay" className="card window reveal" data-title="scripted_replay — no model">
      <p className="eyebrow">Scripted replay · recorded strings, no model</p>
      <div className="head">
        <h2>What the “Generate” button really does.</h2>
        <span className={`pill ${out.real ? 'good' : 'warn'}`}>{out.real ? 'Own scripted sample' : `Fallback: ${g.fallback.role}/${g.fallback.task}`}</span>
      </div>
      <p className="sub" style={{ marginTop: 0 }}>
        The prototype picks a string from <code>sampleOutputs</code>, waits {fmt(g.delayMs)} ms, then adds one character every {g.charMs} ms.
        This replays the exact string at that timing{g.template ? ', including the “Based on your prompt” prefix the workspace adds around whatever you type' : ''}. Nothing is generated.
      </p>
      <div className="controls">
        <Field label="Generator">{(id) => (
          <select id={id} value={pick.gen} onChange={(e) => setPick({ ...pick, gen: e.target.value })}>
            <option value="demo">{GEN_META.demo.label}</option><option value="ws">{GEN_META.ws.label}</option>
          </select>)}</Field>
        <Field label="Role">{(id) => (
          <select id={id} value={roleOk ? pick.role : g.roles[0].id} onChange={(e) => setPick({ ...pick, role: e.target.value })}>
            {g.roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>)}</Field>
        <Field label="Task">{(id) => (
          <select id={id} value={taskOk ? pick.task : g.tasks[0].id} onChange={(e) => setPick({ ...pick, task: e.target.value })}>
            {g.tasks.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>)}</Field>
        {g.template && <Field label="Your prompt">{(id) => <input id={id} type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />}</Field>}
      </div>
      <div className="actions" style={{ marginTop: 0 }}>
        <button type="button" className="btn primary" onClick={() => setRun((n) => n + 1)} disabled={phase === 'waiting' || phase === 'typing'}>▶ Replay scripted sample</button>
        <Seg label="Replay speed" value={speed} onChange={setSpeed} options={[[1, 'Repo speed'], [5, '5×']]} />
        <button type="button" className="btn ghost" onClick={() => { setRun(0); setShown(out.text.length); setPhase('done'); }}>Show all</button>
        <span className="hint">At repo speed this takes {(totalMs / 1000).toFixed(1)} s for {fmt(out.text.length)} characters.</span>
      </div>
      <div className="out" aria-live="polite" aria-label="Replayed output">
        {phase === 'idle' && !shown ? <span className="hint">Press replay. The text appears exactly as the prototype types it.</span>
          : phase === 'waiting' ? <span className="hint">Waiting {g.delayMs} ms, as the prototype does…</span>
            : <>{out.text.slice(0, shown)}{phase === 'typing' && <span className="caret" />}</>}
      </div>
    </section>
  );
}

const PRESETS = ['this is great', 'I need help picking a role', 'Can I try the professor role?', 'What does the Pro plan cost?', 'shipping times?', 'Write me a research paper'];

function Router() {
  const [msg, setMsg] = useState(PRESETS[1]);
  const id = useId();
  const r = P.route(ROUTER, msg);
  return (
    <section id="router" className="card window reveal" data-title="ChatbotWidget.jsx — getResponse() playground">
      <p className="eyebrow">Live · runs in your browser</p>
      <h2>The chatbot is a keyword list, and <em>order</em> decides.</h2>
      <p className="sub">
        This runs the {ROUTER.branches.length}-branch if/else chain parsed from <a href={blob('frontend/src/components/ChatbotWidget.jsx')}>ChatbotWidget.jsx</a> on what you type.
        It lower-cases the message and checks substrings top to bottom; the first hit wins and returns a canned reply from <a href={blob('frontend/src/mock.js')}>mock.js</a> after a {fmt(ROUTER.delay)} ms “typing” pause.
        Substring tests misfire: “t<b>hi</b>s” and “s<b>hi</b>pping” count as a greeting.
      </p>
      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor={id}>Message to the chatbot</label>
        <input id={id} type="text" value={msg} onChange={(e) => setMsg(e.target.value)} className="text" />
      </div>
      <div className="chips">{PRESETS.map((p) => <button type="button" key={p} className={`chip ${p === msg ? 'on' : ''}`} onClick={() => setMsg(p)}>{p}</button>)}</div>
      <div className="grid2" style={{ marginTop: 16 }}>
        <ol className="chain" aria-label="Router branches in order">
          {ROUTER.branches.map((b, i) => {
            const fired = r.fired?.i === i, shadow = r.shadowed.find((s) => s.i === i);
            return (
              <li key={b.reply} className={fired ? 'fired' : shadow ? 'shadow' : ''}>
                <span className="mono">{i + 1}. {b.reply}</span>
                <span className="kws">{b.keywords.map((k) => <code key={k} className={msg.toLowerCase().includes(k) ? 'hit' : ''}>{k}</code>)}</span>
                {fired && <span className="pill good">fires</span>}{shadow && <span className="pill warn">also matched, never reached</span>}
              </li>
            );
          })}
          <li className={!r.fired ? 'fired' : ''}><span className="mono">else. {ROUTER.fallback}</span>{!r.fired && <span className="pill good">fires</span>}</li>
        </ol>
        <div className="tile">
          <p className="eyebrow" style={{ marginBottom: 4 }}>Canned reply · chatbotResponses.{r.reply}</p>
          <p style={{ margin: 0 }}>{REPLIES[r.reply]}</p>
          <p className="hint" style={{ marginBottom: 0 }}>{r.fired ? <>Matched <code>{r.fired.kw.join(', ')}</code> in branch {r.fired.i + 1}.{r.shadowed.length ? ` ${r.shadowed.length} later branch${r.shadowed.length > 1 ? 'es' : ''} also matched but can never answer.` : ''}</> : 'No keyword matched, so the default reply is used.'}</p>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const [pw, setPw] = useState('Writer1');
  const id = useId();
  const s = P.strength(RULES, pw);
  const emailPath = AUTH.methods.find((m) => m.name === 'signIn');
  return (
    <section id="arch" className="card window reveal" data-title="App.js · AuthContext.jsx · server.py">
      <p className="eyebrow">Architecture</p>
      <h2>Five routes, client-side auth, a backend nobody calls.</h2>
      <div className="grid2" style={{ marginTop: 16 }}>
        <div>
          <h3>Routes in <a href={blob('frontend/src/App.js')}>App.js</a></h3>
          <div className="scroll-x" style={{ overflowX: 'auto' }}><table><tbody>{ROUTES.map((r) => <tr key={r.path}><td className="mono">{r.path}</td><td>{r.component}</td><td>{r.guarded ? <span className="pill warn">guarded</span> : <span className="hint">public</span>}</td></tr>)}</tbody></table></div>
          <h3 style={{ marginTop: 20 }}>Endpoints in <a href={blob('backend/server.py')}>server.py</a></h3>
          <table><tbody>{ENDPOINTS.map((e) => <tr key={e.method + e.path}><td className="mono">{e.method}</td><td className="mono">{e.path}</td></tr>)}</tbody></table>
          <p className="hint">The stock “Hello World” and status-check example. No generation endpoint. “Guarded” means ProtectedRoute, which runs only in the browser. Stack: {DEPS} frontend dependencies, {PY_REQS} Python requirements.</p>
        </div>
        <div>
          <h3>Sign-in paths in <a href={blob('frontend/src/contexts/AuthContext.jsx')}>AuthContext.jsx</a></h3>
          <table><tbody>{AUTH.methods.map((m) => <tr key={m.name}><td className="mono">{m.name}()</td><td>{m.verified ? <span className="ok">sets verified</span> : <span className="no">never sets verified</span>}</td></tr>)}</tbody></table>
          <p className="hint">
            {AUTH.acceptsAnyCredentials ? 'Email sign-in accepts any non-empty email and password' : 'Email sign-in checks credentials'} and stores the user in localStorage ({AUTH.storageWrites} writes, no server).
            {!emailPath.verified && ' Because it never sets verified, ProtectedRoute bounces that user from /dashboard back to /signin: only the Google, Twitter and sign-up paths reach the dashboard.'}
            {' '}The sign-up verification code is the constant <code>{AUTH.code}</code>.
          </p>
          <div className="field" style={{ marginTop: 16 }}>
            <label htmlFor={id}>Password strength, the repo’s own scoring <span>{s.score}/{RULES.max} · {s.label}</span></label>
            <input id={id} type="text" value={pw} onChange={(e) => setPw(e.target.value)} className="text" autoComplete="off" spellCheck="false" />
          </div>
          <div className="track" style={{ marginTop: 10 }}><div className="fill" style={{ width: `${(s.score / RULES.max) * 100}%`, background: ['var(--bad)', 'var(--bad)', 'var(--warn)', 'var(--good)', 'var(--good)'][s.score] }} /></div>
          <ul className="checks">{s.checks.map((c) => <li key={c.rule} className={c.ok ? 'ok' : 'no'}>{c.ok ? '✓' : '✗'} <code>{c.rule}</code></li>)}</ul>
          <p className="hint">Ported from <a href={blob('frontend/src/components/auth/SignUpPage.jsx')}>SignUpPage.jsx</a>. Shown only in the UI; nothing enforces it. Do not type a real password: it is a plain text box.</p>
        </div>
      </div>
    </section>
  );
}

function useNarrow() {
  const q = '(max-width: 760px)';
  const [n, setN] = useState(() => window.matchMedia(q).matches);
  useEffect(() => { const m = window.matchMedia(q), f = () => setN(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  return n;
}

function Inventory() {
  const [hover, setHover] = useState(null);
  const narrow = useNarrow();
  const max = OWN[0].lines, rowH = 22, W = narrow ? 340 : 640, L = narrow ? 118 : 150, H = OWN.length * rowH + 24; // narrow viewBox keeps labels legible on phones
  return (
    <section id="inventory" className="card window reveal" data-title="line counts — frontend/src/components">
      <p className="eyebrow">Code inventory</p>
      <div className="head">
        <h2>{fmt(sumLines(OWN))} lines across {OWN.length} hand-written components.</h2>
        <span className="pill info">+ {UI.length} shadcn/ui primitives, {fmt(sumLines(UI))} lines</span>
      </div>
      <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Lines per hand-written component, largest ${OWN[0].name} with ${OWN[0].lines} lines`} onMouseLeave={() => setHover(null)}>
        {[0.25, 0.5, 0.75, 1].map((f) => <line key={f} className="axis" x1={L + f * (W - L - 40)} x2={L + f * (W - L - 40)} y1={0} y2={H - 20} />)}
        {OWN.map((f, i) => {
          const w = (f.lines / max) * (W - L - 40), y = i * rowH;
          return (
            <g key={f.path} onMouseEnter={() => setHover(f)}>
              <text x={L - 8} y={y + 15} textAnchor="end">{f.name}</text>
              <rect x={L} y={y + 4} width={w} height={rowH - 8} rx="4" fill={f.path.includes('/dashboard/') ? 'var(--primary)' : f.path.includes('/auth/') ? 'var(--warn)' : 'var(--good)'} opacity={hover && hover !== f ? 0.4 : 0.9} />
              <text x={L + w + 6} y={y + 15}>{f.lines}</text>
            </g>
          );
        })}
        {[0, 0.5, 1].map((f) => <text key={f} x={L + f * (W - L - 40)} y={H - 4} textAnchor="middle">{Math.round(f * max)}</text>)}
      </svg>
      <div className="legend"><span><i style={{ background: 'var(--good)' }} />Landing page</span><span><i style={{ background: 'var(--warn)' }} />Auth</span><span><i style={{ background: 'var(--primary)' }} />Dashboard</span></div>
      <p className="tip">{hover ? <><code>{hover.path}</code> · {hover.lines} lines</> : `Backend: server.py is ${P.lineCount(serverSrc)} lines. Hover a bar for its file.`}</p>
    </section>
  );
}

function Plans() {
  return (
    <section id="plans" className="card window reveal" data-title="PricingSection.jsx · mock.js — placeholder copy">
      <p className="eyebrow">Prototype copy, not a live offer</p>
      <h2>Plan tiers written into the landing page.</h2>
      <div className="tiles" style={{ gridTemplateColumns: `repeat(${PLANS.length}, minmax(0, 1fr))` }}>
        {PLANS.map((p) => <div className="tile" key={p.name}><div className="num">{p.price}<small className="of">{p.period}</small></div><div className="cap"><b>{p.name}</b> · {p.quota}</div></div>)}
      </div>
      <p className="hint" style={{ marginTop: 16 }}>
        Parsed from <a href={blob('frontend/src/components/PricingSection.jsx')}>PricingSection.jsx</a>. There is no billing code and no word metering behind these tiers.
        Left out on purpose: the {TESTIMONIALS} testimonials in <code>mock.js</code> (invented quotes attributed to named people, some at real universities), its {COMPANY_STATS} company stats (user, word, rating and country counts with no source),
        the dashboard’s usage numbers, and <code>ComparisonSection.jsx</code>’s unsourced claims about named competitors. They are placeholder copy, so this page does not repeat them as facts.
      </p>
    </section>
  );
}

function Honesty() {
  const real = ['Full React UI: landing page, sign-in, sign-up, verify, dashboard', `Client routing (${ROUTES.length} routes) and a client-only route guard`, `Keyword router (${ROUTER.branches.length} branches) and password meter`, `FastAPI app with ${ENDPOINTS.length} example endpoints and MongoDB wiring`];
  const mocked = [`Generation: ${SCRIPTED} scripted samples, typed by setInterval`, 'Auth: any non-empty email and password, stored in localStorage', 'Usage stats, documents list, testimonials, company stats', `Backend link: ${BACKEND_CALLS} calls from the UI`];
  const gaps = [
    ['No model integration', 'Needs a backend generation endpoint and a provider key; paid per call, so out of scope here.'],
    ['Fake auth', 'Needs a real identity provider or server sessions; the email path cannot reach the dashboard at all.'],
    ['No product tests', 'Added: the known-answer check. Still missing: component tests (CRA jest is wired but unused) and a backend test with a Mongo container.'],
    ['Broken starter CI', 'node.js.yml, npm-grunt.yml and npm-publish.yml expect a root package.json and Gruntfile that do not exist. Flagged, not deleted.'],
  ];
  return (
    <section id="honesty" className="card window reveal" data-title="research-review.md — honesty and gaps">
      <p className="eyebrow">Honesty and threats</p>
      <div className="head"><h2>Engineering grade: D, a UI prototype.</h2><span className="pill bad">No user or model evidence</span></div>
      <div className="grid2">
        <div className="tile"><h3>Real</h3><ul className="checks">{real.map((t) => <li key={t} className="ok">✓ <span>{t}</span></li>)}</ul></div>
        <div className="tile"><h3>Mocked</h3><ul className="checks">{mocked.map((t) => <li key={t} className="no">✗ <span>{t}</span></li>)}</ul></div>
      </div>
      <div className="grid2" style={{ marginTop: 16 }}>
        {gaps.map(([t, d]) => <div className="tile" key={t}><h3>{t}</h3><p className="hint" style={{ margin: '4px 0 0' }}>{d}</p></div>)}
      </div>
      <p className="hint" style={{ marginTop: 16 }}>
        Limits of this page: it reads the source, not a running app, so it shows what the code does, not how people use it. Regex parsing fits these hand-written arrays; the check fails loudly if their shape changes.
        Full grading: <a href={blob('docs/research-review.md')}>docs/research-review.md</a>.
      </p>
    </section>
  );
}
