# Aurelia Restaurant CMS — Django Backend

A dedicated Django REST Framework backend powering the Art Deco restaurant CMS and customer reservation inquiries.

## Features
- **Public Endpoints**:
  - `GET /api/content/`: Delivers live published restaurant configuration, 15 sections' content, themes, colors, and typography to frontend visitors.
  - `POST /api/reservations/`: Customer table reservation inquiry submission endpoint.
- **Admin-Only Protected Endpoints**:
  - `POST /api/auth/login/`: Administrator login with token authentication.
  - `GET /api/auth/me/`: Verify active admin session.
  - `POST /api/content/`: Save and publish live CMS edits directly into the database.
  - `GET /api/reservations/`: View all customer reservation requests.
  - `PATCH /api/reservations/<id>/`: Confirm or cancel customer reservation requests.
- **Django Admin Portal**: Full database control at `/admin/`.

## Default Admin Credentials
- **Username**: `admin`
- **Password**: `adminpassword123`
- **Email**: `admin@aurelia-dining.com`

## Starting the Backend Server
```bash
python3 manage.py migrate
python3 manage.py init_cms
python3 manage.py runserver 127.0.0.1:8001
```
