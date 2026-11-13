# Restaurant Portfolio & CMS Backend

Art Deco Glamour — 3D Cinematic Restaurant Website with Django CMS Backend.

## Project Structure
```
restaurent/
└── project 1/
    ├── frontend/          # React 18 + Vite + Three.js + R3F + Live Admin CMS
    └── backend/           # Django 5 + Django REST Framework + SQLite Database
```

---

## Quick Start

### 1. Start Django Backend (Port 8001)
```bash
cd "project 1/backend"
python3 manage.py migrate
python3 manage.py init_cms
python3 manage.py runserver 127.0.0.1:8001
```
- Django Admin Portal: `http://127.0.0.1:8001/admin/`
- Default Admin Username: `admin`
- Default Admin Password: `adminpassword123`

### 2. Start React Frontend (Port 3000)
```bash
cd "project 1/frontend"
npm install
npm run dev
```
- Public Visitor Website: `http://localhost:3000/`
- Site Admin CMS: Click **"ADMIN PORTAL"** in the bottom-right corner.
