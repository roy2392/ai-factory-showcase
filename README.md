# ai-factory-showcase

Showcase target repository for [roy2392/ai-factory](https://github.com/roy2392/ai-factory).

A small TypeScript/Fastify bookings API with three seeded rooms, kept in memory. There is no database
or booking creation endpoint yet; factory requirements issues can grow the service from this baseline.

## Run locally

Use Node.js 24 (`nvm use` with nvm installed), then:

```sh
npm ci
npm run dev
```

The server listens on `0.0.0.0:3000`. Set `PORT` to change it, for example `PORT=3001 npm run dev`.
To run the compiled service, use `npm run build` followed by `npm start`.

## API

| Request          | Response                                                           |
| ---------------- | ------------------------------------------------------------------ |
| `GET /health`    | 200, `{"status":"ok"}`                                             |
| `GET /rooms`     | 200, JSON array of the three rooms below                           |
| `GET /rooms/:id` | 200, one room; 404, `{"error":"Room not found"}` for an unknown ID |

Room IDs are case-sensitive. The seeded list is:

```json
[
  { "id": "atlas", "name": "Atlas", "capacity": 4 },
  { "id": "cedar", "name": "Cedar", "capacity": 8 },
  { "id": "summit", "name": "Summit", "capacity": 12 }
]
```

```sh
curl http://localhost:3000/health
curl http://localhost:3000/rooms
curl http://localhost:3000/rooms/atlas
```

## Development

| Command             | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Start with tsx and restart on changes                   |
| `npm run build`     | Compile source to `dist/` with tsc                      |
| `npm start`         | Run `dist/server.js`                                    |
| `npm run lint`      | ESLint and Prettier check                               |
| `npm run format`    | Apply Prettier                                          |
| `npm run typecheck` | Typecheck source and tests without emitting files       |
| `npm test`          | Run Vitest with Fastify injection (no listening socket) |
| `npm run verify`    | Lint, typecheck, test and build                         |

`src/app.ts` builds the app; `src/server.ts` starts the listener. HTTP routes live in `src/routes/`,
domain types and data in `src/domain/`, and tests in `test/`. Never edit generated `dist/` files.

## AI factory integration

The callers in `.github/workflows/ai-factory.yml` and `metrics.yml` use
`roy2392/ai-factory` reusable workflows at `v1`. `.github/ai-factory.yml` keeps the factory defaults,
uses squash merges, has no explicit reviewers, escalates to `roy2392`, and gates plans by label.
Agent instructions and the review-triage skill live in `.github/` and `AGENTS.md`.

CI runs `npm ci` and `npm run verify` for pull requests and pushes to `main`. Its required check name
is exactly `verify`; the self-heal caller watches the workflow named `CI`.

Before exercising the factory on GitHub, follow the
[factory setup guide](https://github.com/roy2392/ai-factory/blob/main/docs/SETUP.md):

- Make the factory's `v1` reusable workflows accessible to this repository.
- Install the factory GitHub App on both repositories and provide `FACTORY_APP_ID`,
  `FACTORY_APP_PRIVATE_KEY`, `COPILOT_ASSIGN_TOKEN` and `COPILOT_CLI_TOKEN` as repository-accessible secrets.
- Configure `COPILOT_BOT_LOGIN`, the bot's write access and Copilot seat, and the factory labels.
- Enable auto-merge and squash merging. Require `verify`, one human approval, dismissal of stale
  approvals and conversation resolution on `main`, and configure Copilot code review.
- Enable the coding agent, configure workflow approval, and allow the npm registry through its firewall.

Then smoke-test issue dispatch, a plan-gated issue, `/ai ask`, requirements sub-issues, and CI/self-heal
on a Copilot PR. Local checks do not establish that GitHub credentials, policies or factory flows work.
