# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Docker (frontend + backend + MySQL)

I included a `Dockerfile` for the frontend and a `docker-compose.yml` that can build and run the backend (from `Backend/carrental-backend-main`), frontend, and a MySQL container.

Build and run (PowerShell):

```powershell
# From project root
docker compose build
docker compose up -d
```

Notes:
- The frontend image is built with a build-arg `VITE_API_BASE` which is set in `docker-compose.yml` to `http://backend:8081`. That makes the frontend call the backend service using the compose network name.
- Frontend is served using nginx on container port 80 and mapped to host port 5173 by default (so open http://localhost:5173).
- Backend is built from `Backend/carrental-backend-main` Dockerfile and exposed on port 8081.
- MySQL is available at `db:3306` inside the compose network and mapped to host `3306`.

If you prefer to run frontend alone (dev mode):

```powershell
npm install
npm run dev
```
