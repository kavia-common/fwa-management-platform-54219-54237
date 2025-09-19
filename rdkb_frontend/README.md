# RDK-B FWA Frontend (React)

Modern dashboard UI for visualizing, managing, and monitoring Fixed Wireless Access (FWA) devices running RDK-B.

- Ocean Professional theme: blue and amber accents, minimalist design
- Responsive layout with top bar, sidebar, content panels, and modals
- Integrated with rdkb_backend REST APIs for auth, devices, configuration, monitoring, and admin operations
- Environment-configurable API base URL and site URL

## Quick Start

1) Install dependencies
   npm install

2) Configure environment
   Create a .env file in rdkb_frontend with:
   REACT_APP_API_BASE_URL=http://localhost:8000
   REACT_APP_SITE_URL=http://localhost:3000

3) Run
   npm start
   App: http://localhost:3000

## Environment Variables

- REACT_APP_API_BASE_URL: Base URL of rdkb_backend (required)
- REACT_APP_SITE_URL: Public site URL used for redirects (e.g., email linkbacks) (optional but recommended)

You can copy .env.example to .env and adjust.

## Project Structure

src/
  api/           // API client and helpers
  components/    // Reusable UI components (Topbar, Sidebar, Cards, Modal, etc.)
  pages/         // Route pages (Login, Dashboard, Devices, DeviceDetail, Config, Monitoring, Admin, NotFound)
  routes/        // Authenticated routing and guards
  theme/         // Theme constants and helpers
  App.js         // App shell with routes
  index.js       // Entry point
  App.css        // Global styles (Ocean Professional)

## API Integration

The frontend uses fetch with a small wrapper to:
- Attach auth token headers
- Handle JSON parsing and errors
- Support GET/POST/PUT/DELETE

Endpoints are expected from rdkb_backend (FastAPI), discovered via REACT_APP_API_BASE_URL. Adjust paths in src/api/endpoints.js if your backend uses different routes.

## Authentication

Basic token-based login is implemented. Tokens are stored in localStorage. A simple guard redirects unauthenticated users to /login.

## Theming

Ocean Professional theme (primary #2563EB, secondary #F59E0B, background #f9fafb, surface #ffffff, text #111827). Styles are CSS variables and utility classes in App.css. Components use these variables consistently.

## Scripts

- npm start
- npm run build
- npm test

## Notes

- If backend endpoints differ, update src/api/endpoints.js accordingly.
- For WebSocket-based live telemetry (if available later), add a WS helper in src/api and surface it in Monitoring page.
