# Medify Monorepo

This workspace now contains both the Medify frontend (Next.js) and backend (Django + MySQL).

```
gp_1/
├── frontend/   # Next.js + Tailwind CSS app (existing UI)
└── backend/    # Django REST API with MySQL storage
```

## Frontend

The original instructions and run steps remain in `frontend/README.md`.

```bash
cd frontend
npm install
npm run dev
```

## Backend

The new Django backend lives inside `backend/`. See `backend/README.md` for full details.

Quick start:

```bash
cd backend
python -m venv .venv
.\\.venv\\Scripts\\activate  # Windows
pip install -r requirements.txt
cp env.example .env          # update MySQL credentials
python manage.py migrate
python manage.py loaddata core/fixtures/default_data.json
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.

## Frontend ↔ Backend Integration

- Configure the Next.js app to point to the Django API (e.g., `NEXT_PUBLIC_API_URL=http://localhost:8000/api`).
- The payment buttons currently call placeholder endpoints—wire them up to `/api/website-setups/:id/pay/`.
- Business info submission should `POST` to `/api/website-setups/:id/business-info/`.

Both projects are ready for further backend integration, auth, and deployment workflows.

