# Eccomfy - Agencia Digital

Base inicial para la nueva web de Eccomfy con:
- Frontend: React + Vite + Tailwind + CSS personalizado
- Backend: Node.js + Express

## Estructura

- `frontend/`: landing principal de la agencia
- `backend/`: API inicial para estado e integracion

## Requisitos

- Node.js 20+
- npm 10+

## Ejecutar backend

```bash
cd backend
npm install
npm run dev
```

Servidor API en `http://localhost:3000`.

## Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend en `http://localhost:5173`.

## Variables de entorno frontend

Puedes cambiar la URL de API con `VITE_API_URL`.

Ejemplo:

```bash
cd frontend
echo "VITE_API_URL=http://localhost:3000" > .env
```

## API disponible

- `GET /api/status` -> estado del backend
