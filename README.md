# Restaurant Portfolio & CMS

Art Deco Glamour — 3D Cinematic Restaurant Website with Django CMS Backend.

## Project Structure
- **[`project 1/`](./project%201)**: React 18 + Vite + Three.js + React Three Fiber + Lucide. Includes in-browser live Art Deco CMS Studio.
- **[`backend/`](./backend)**: Django 5 + Django REST Framework + django-cors-headers. Stores website CMS content and customer reservations.

---

## Getting Started

### 1. Start the Django Backend (Port 8001)
```bash
cd backend
python3 manage.py migrate
python3 manage.py init_cms
python3 manage.py runserver 127.0.0.1:8001
```
- Django Admin Portal: `http://127.0.0.1:8001/admin/`
- Default Admin Username: `admin`
- Default Admin Password: `adminpassword123`

### 2. Start the React Frontend (Port 3000)
```bash
cd "project 1"
npm install
npm run dev
```
- Public Visitor Website: `http://localhost:3000/`
- Admin CMS Access: Click **"ADMIN PORTAL"** in the bottom-right corner and sign in with `admin` / `adminpassword123`.
