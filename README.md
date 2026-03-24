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
