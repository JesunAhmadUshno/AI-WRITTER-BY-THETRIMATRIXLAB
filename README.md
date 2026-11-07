# TheTrimatrixLab writing-assistant prototype

Live dashboard: https://jesunahmadushno.github.io/AI-WRITTER-BY-THETRIMATRIXLAB/

A front-end prototype of a role-based writing assistant: pick a role (Professor, Scientist, Poet, Philosopher, Student, Gamer) and a task (essay, blog post, email, and so on) and the app "writes" for you. The UI is complete; the writing is not. Every answer is a hard-coded sample typed out by a timer, and the backend is the stock FastAPI example.

## What is real and what is mocked

| Area | State | Where |
|---|---|---|
| Landing page, sign-in, sign-up, verify, dashboard UI | Real (React, Tailwind, shadcn/ui) | `frontend/src/components/` |
| Client routing and route guard | Real, but the guard runs only in the browser | `frontend/src/App.js`, `auth/ProtectedRoute.jsx` |
| Chatbot | A keyword if/else chain with canned replies | `ChatbotWidget.jsx`, `mock.js` |
| Generation | Scripted: 8 of 24 landing-page picks and 4 of 36 workspace picks have a sample; the rest show the Professor/Academic text | `LiveDemo.jsx`, `dashboard/WritingWorkspace.jsx` |
| Auth | Mocked: any non-empty email and password, stored in `localStorage`; verification code is a constant | `contexts/AuthContext.jsx` |
| Usage stats, documents, testimonials, company stats, competitor table | Placeholder copy, not data | `mock.js`, `dashboard/*.jsx`, `ComparisonSection.jsx` |
| Backend | `GET /api/`, `POST /api/status`, `GET /api/status` with MongoDB; the UI never calls it | `backend/server.py` |

The counts above are asserted by `site/src/repo.check.mjs`, so they cannot drift silently.

## Run it

Frontend (Node, Yarn 1 as pinned in `packageManager`):

```bash
cd frontend
yarn install
yarn start          # http://localhost:3000
```

Backend (Python 3, a local MongoDB):

```bash
cd backend
pip install -r requirements.txt
MONGO_URL=mongodb://localhost:27017 DB_NAME=writer uvicorn server:app --reload --port 8001
```

The dashboard and its check:

```bash
cd site
npm ci
npm test            # known-answer check: parses the source and asserts the facts the dashboard shows
npm run build       # runs the check, then builds site/dist
```

## Known issues

- The three starter workflows in `.github/workflows/` (`node.js.yml`, `npm-grunt.yml`, `npm-publish.yml`) expect a root `package.json` and Gruntfile that do not exist, so they fail if triggered.
- `backend/.env` and `frontend/.env` are committed. They hold a local database URL and a preview host, no secrets, but belong in `.env.example` files.

A full engineering review, with what each remaining gap would take to close, is in [docs/research-review.md](docs/research-review.md).
