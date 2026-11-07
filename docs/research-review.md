# Research and engineering review

Reviewed 7 Nov 2026 on branch `site/live-dashboard`. Every count below is asserted by `site/src/repo.check.mjs` (run by `cd site && npm test` and by `npm run build`), so a change to the prototype that breaks one fails the build.

## Verdict

**Engineering grade: D, stage "UI prototype".** The repo is a complete-looking React front end over a stub backend. It makes no research claim of its own, so the research rubric mostly grades what is *missing* before any claim could be made. Its main risk is not bad code but a convincing illusion: scripted text typed out like live output, and invented testimonials and statistics shown as if real.

## Rubric

| Criterion | Grade | Evidence | Fixed now | Remaining gap and what it needs |
|---|---|---|---|---|
| Question / problem statement | F → C | The old README was `# Here are your Instructions`. | README now states what the prototype is and what is mocked. | A user problem statement (who writes what, and what "better" means) needs product interviews or a short user survey; no compute. |
| Hypotheses | F | None. The product implies one: role-conditioned prompts give text that readers judge more fitting for the task than an unconditioned prompt. | Stated here. | Testing it needs a real generation endpoint plus a blinded rating study (for example 6 roles x 6 tasks x 20 prompts = 720 generations, each rated by 3 raters). Generation cost depends on the provider chosen; this is a paid run and needs the Owner's approval. |
| Method | F | Generation is `sampleOutputs[role]?.[task] \|\| sampleOutputs.professor.academic` plus `setTimeout`/`setInterval` (LiveDemo: 500 ms, 30 ms/char; workspace: 1000 ms, 20 ms/char). | The dashboard shows exactly this, labelled "scripted sample, no model". | A backend `/api/generate` route that builds a role and task prompt and calls a model. |
| Baselines | F | No comparison of any kind. `ComparisonSection.jsx` makes unsourced claims about named competitors. | Dashboard omits those claims and flags them. | A no-role prompt to the same model is the natural baseline; it rides on the rating study above. |
| Statistics / uncertainty | N/A now | There are no measurements. Sample texts contain invented statistics (`p < 0.001, n = 2,847`) and `UsageStats.jsx` shows fixed mock numbers. | Dashboard never presents them as results. | With the rating study: per-cell mean ratings with bootstrap 95% CIs and inter-rater agreement (Krippendorff's alpha). |
| Reproducibility | D → C | No tests (empty `tests/__init__.py`, `test_result.md` holds only a template), no lockfile for the frontend, three starter CI workflows that cannot pass. | `site/src/repo.check.mjs` is the first runnable test: it re-derives 6 roles, 4 and 6 tasks, 8/24 and 4/36 coverage, the timer values, the 9-branch router order and outputs, the password rules, 5 routes, 3 endpoints, 3 plan tiers, the auth findings and the line inventory. Exact-pinned site dependencies with a lockfile; Pages workflow builds the site. | Frontend `yarn.lock` (needs a `yarn install` run, about 50 dependencies), component tests with the CRA jest runner already wired in `craco test`, and a backend test against a throwaway MongoDB container in CI. |
| Threats to validity | F → C | Fabricated social proof: 6 testimonials in `mock.js` attribute invented quotes to named people, some at real universities; 4 `companyStats` values have no source. | Dashboard leaves them out and says why. | Removing or relabelling them in the product is the Owner's call (it changes their copy). |
| Related work | F | None. | Not added: a literature review of persona or role prompting is out of scope for a UI prototype. | A short related-work note once the generation endpoint exists, covering persona prompting and style-transfer evaluation. Reading only; no compute. |
| Limitations | F → B | Not stated anywhere. | README and dashboard both list what is mocked; dashboard states its own limit (it reads source, not a running app; regex parsing fits these arrays and fails loudly if they change). | None beyond the above. |

## Engineering rigor (product app)

| Area | Finding | Status |
|---|---|---|
| Auth | `signIn` accepts any non-empty email and password and writes the user to `localStorage`. It now sets `verified: true` like the other paths (it used to omit it, so `ProtectedRoute` bounced the email path back to `/signin`). Google and Twitter paths are hard-coded users with `verified: true`. The verification code is the constant `123456`. | Still mock auth: a real fix needs an identity provider or server sessions. |
| Frontend to backend | Zero `fetch` or `axios` calls in the hand-written source; `REACT_APP_BACKEND_URL` is set but unused. | Flagged. |
| Backend | Stock FastAPI example: `GET /api/`, `POST /api/status`, `GET /api/status`. `@app.on_event("shutdown")` is deprecated in current FastAPI. | Flagged. |
| Coverage of its own feature | Only 8 of 24 landing-page picks and 4 of 36 workspace picks have their own text; the rest silently fall back with no message. | Shown live on the dashboard. A one-line "sample not available" notice would be the cheap product fix; left to the Owner. |
| Chatbot router | Substring matching on an ordered chain: "this" and "shipping" match `hi` (greeting); "help" routes to support before roles is ever checked; "restart" matches `start` (sign-up). | Shown live; asserted in the check. A word-boundary regex is the cheap product fix. |
| CI | `node.js.yml`, `npm-grunt.yml`, `npm-publish.yml` run `npm ci` and `grunt` at the repo root, where no `package.json` or Gruntfile exists. | Fixed: `node.js.yml` now installs, tests and builds `frontend/` (yarn, Node 20 and 22) and `site/` (npm); `npm-grunt.yml` and `npm-publish.yml` skip their steps until a root `package.json` or Gruntfile exists. `tests/workflows.test.mjs` checks every workflow against the repo layout. |
| Hygiene | `backend/.env`, `frontend/.env` and a bot-identity `.gitconfig` are committed (no secrets found). Commit history is "auto-commit for <uuid>". | Flagged; history left alone. |
| Security of the dashboard | No secrets, exact-pinned dependencies, no external scripts besides the Google Fonts stylesheet, `npm audit` clean in `site/`. | Done. |

## What would raise the grade

1. **C:** frontend lockfile, a handful of component tests, working CI for `frontend/`, the fallback notice and the word-boundary router fix. No paid compute.
2. **B:** a real `/api/generate` endpoint and real auth. Needs a model provider key (paid per call) and an identity provider.
3. **A:** the blinded rating study above with a no-role baseline and uncertainty reported. Paid generation plus rater time.
