# Platform React Challenge | CatLover App

Lightweight React + TypeScript app (Vite) for browsing random cat images, exploring cat breeds, and managing favorite images using deep-linkable modals, and React Query for data fetching/caching. This repo was created as an assessment/demo project and contains small, focused components and hooks.

## Quick start

Prerequisites
- Node 16+ and npm (or Yarn/pnpm)

Install

```powershell
npm install
```

Run (dev)

```powershell
npm run dev
```

Build / preview

```powershell
npm run build
npm run preview
```

Run tests (Vitest)

```powershell
npm run test
```

Lint

```powershell
npm run lint
```

Open the app at http://localhost:5173

## Environment

Create a `.env` file at project root (or use the same `.env`) and set:

```text
VITE_API_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=your_thecatapi_key_here
```

Notes:
- The API key is required for some endpoints or query parameters (for example `limit` when fetching images).
- Do not commit secrets - For demo purposes, a development API key is included in this repository. In production, API keys must always be stored securely and never committed.

## Features

- Browse random cat images
- Refresh or load more cat images
- Browse and search cat breeds (debounced client-side search)
- Breed cards with metrics and expandable description
- Deep-linkable modals for images and breed details (query params)
- Save / Remove Favorites (React Query mutations - optimistic updates for better performance)
- Skeleton loading states and lazy-loaded images

## Project structure (high level)

- src/
  - routes/
    - Images/        — random images page, modal, hooks, api
    - Breeds/        — breeds page, card, modal, hooks, api
    - Favorites/     — favorites page, components, hooks, api
  - types/           — shared TypeScript models
  - hooks/           — small reusable hooks (debounce, lock body scroll)
  - components/      — layout and shared UI
  - test-utils.tsx   — test helpers

## Testing

This repo uses Vitest + Testing Library for small focused tests. Tests live close to the components they cover (see `src/routes/Favorites/tests`).

## Best practices demonstrated

- Feature-scoped folders and small components
- React Query for caching and mutations
- Centralized TypeScript types (`src/types`) for consistency
- Debounced user input to reduce renders
- Skeletons and lazy loading for better performance
- Accessibility-conscious patterns

## Suggested next steps

- Add optimistic updates for favorites page (immediate UI feedback with rollback)
- Add more tests (hook tests, integration tests for modals)
- Improve accessibility
- Add caching and image CDN optimizations (srcSet, WebP)
