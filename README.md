# Tech.Care — Patient Dashboard (FED Skills Test)

## How to run (dev)
1. npm install
2. npm run dev
3. Open http://localhost:5173

## How to build (production)
1. npm run build
2. Serve `dist/` (serve -s dist) or open `dist/index.html`

## API
- Endpoint: https://fedskillstest.coalitiontechnologies.workers.dev
- Auth: Basic auth (coalition:skills-test)
- Implementation: The app calls `btoa('coalition:skills-test')` at runtime to create the Authorization header.

## Notes
- The UI displays **Jessica Taylor** by default as required.
- Chart used: Chart.js (react-chartjs-2)
- Files included: `src/` (source), `dist/` (build), `assets/`, `package.json`, `README.md`
- No code from other people was used; icons are project assets or simple SVGs.
