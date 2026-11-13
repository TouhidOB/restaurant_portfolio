# Project 1 — Art Deco Restaurant & CMS

Full-stack Art Deco 3D Cinematic Restaurant Website with Django REST CMS Backend.

## Directory Structure
- **[`frontend/`](./frontend)**: React 18 + Vite + Three.js + React Three Fiber + Lucide. Visitor restaurant website with in-browser site admin CMS Studio.
- **[`backend/`](./backend)**: Django 5 + Django REST Framework + django-cors-headers. SQLite database with admin auth, CMS content API, and reservations management.

---

## Quick Start

### 1. Run Backend Server
```bash
cd backend
python3 manage.py migrate
python3 manage.py init_cms
python3 manage.py runserver 127.0.0.1:8001
```
- Django Admin Portal: `http://127.0.0.1:8001/admin/`
- Default Admin Username: `admin`
- Default Admin Password: `adminpassword123`

### 2. Run Frontend Server
```bash
cd frontend
npm install
npm run dev
```
- Public Visitor Website: `http://localhost:3000/`
- Site Admin CMS Sign-In: Click **"ADMIN PORTAL"** at bottom right.
