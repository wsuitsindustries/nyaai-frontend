# Nya AI — Frontend

React chat interface for the Nya AI enterprise knowledge agent. Built with Vite, TypeScript, and Tailwind CSS v4.

## Directory Structure

```
public/
  favicon.png
  images/nya-logo.png
src/
  assets/nya-logo.png
  components/
    Chat.tsx        Chat messages, input, suggestions
    Login.tsx       Login screen
    PageLoader.tsx  Animated loading splash
    Settings.tsx    Theme & preferences modal
    Sidebar.tsx     Navigation, conversations, profile
  hooks/
    useApi.ts       Custom hooks for chat & health
  services/
    api.ts          Backend API client
    types.ts        Shared TypeScript types
  App.tsx           Root component with state management
  main.tsx          Entry point
  index.css         Tailwind imports, animations, utilities
```

## Quick Start

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` and proxies `/api` to `http://localhost:8000`.

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build
```

## Documentation

See the [`docs/`](./docs/) folder for project-level documentation relevant to the frontend:
- [Architecture](./docs/ARCHITECTURE.md) — component tree, routing, state management
- [Development](./docs/DEVELOPMENT.md) — setup, Vite proxy, environment
- [MVP Audit](./docs/MVP_AUDIT.md) — frontend-specific gaps and action items
- [User Flows](./docs/USER_FLOWS.md) — landing, auth, chat, knowledge management flows
