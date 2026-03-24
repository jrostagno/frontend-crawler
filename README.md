# Frontend Crawler

Frontend para el challenge **Amazon Product Descriptions Word Cloud**.

Stack:

- React + TypeScript
- Vite
- Tailwind CSS

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm
- Backend corriendo en `http://127.0.0.1:8000`
- Docker (opcional, para levantar sin Node local)

## Variables de entorno

Este proyecto utiliza variables de entorno de Vite (`VITE_*`).

Archivo de ejemplo:

```bash
# .env.example
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Archivo local para desarrollo:

```bash
# .env.local
VITE_API_BASE_URL=http://127.0.0.1:8000
```

> `.env.local` esta ignorado por git.

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

App local:

- `http://localhost:5173`

## Ejecutar con Docker

Si queres que el recruiter levante el frontend sin instalar Node, puede usar Docker:

```bash
docker compose up --build
```

App en Docker:

- `http://localhost:8080`

### Configurar URL del backend para Docker

Vite inyecta `VITE_API_BASE_URL` en **build time**.
Por defecto `docker-compose.yml` usa:

- `http://localhost:8000`

Si necesitas otra URL, pasala al comando:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000 docker compose up --build
```

### Si el backend esta dockerizado en otro repo

El frontend dockerizado se sirve desde `http://localhost:8080`, por lo tanto el backend debe permitir ese origin en CORS, por ejemplo:

- `http://localhost:8080`
- `http://127.0.0.1:8080`

## API esperada (backend)

- `POST /crawl?productUrl=<URL_ENCODED>`
  - Respuesta:
    - `status`: `"processed" | "already_seen"`
    - `url`: string
    - `new_words`: number
    - `description?`: string | null (opcional, truncada)

- `GET /words/top?limit=10`
  - Respuesta:
    - `limit`: number
    - `words`: `{ word: string; count: number }[]`

## Scripts

- `npm run dev`: entorno de desarrollo
- `npm run build`: build de produccion
- `npm run preview`: servir build localmente
- `npm run lint`: lint del proyecto
