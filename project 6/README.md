# STARDUST // RETRO-FUTURISTIC DINER
## PRD 05 — Full-Stack Decoupled Restaurant Platform

> **Concept & Philosophy:** *Classic Taste. Future Energy.*  
> Combining nostalgic 1950s American diner culture with atomic age sci-fi and modern digital aesthetics.

---

## 🌟 Architecture & Tech Stack

- **Decoupled Architecture**:
  - **Frontend**: React 18 + Vite, Three.js / React Three Fiber / Drei, GSAP, Lucide Icons (Port `3000`)
  - **Backend**: Django 5 + Django REST Framework, SQLite / PostgreSQL-ready (Port `8001`)
  - **Content Management**: Custom Decoupled Django CMS Studio with permanent left sidebar navigation (`/cms/`)
  - **Authentication**: Session-based Django Auth (`admin` / `adminpassword123`)

---

## 🚀 Quickstart & Setup

### 1. Backend (Django 5 + DRF)
```bash
cd "project 6/backend"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py seed_data
python3 manage.py runserver 127.0.0.1:8001
```

### 2. Frontend (React 18 + Vite)
```bash
cd "project 6/frontend"
npm install
npm run dev -- --port 3000 --host 127.0.0.1
```

### 3. URLs & Ports
- **Frontend Live App**: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)
- **Backend API**: [http://127.0.0.1:8001/api/v1/content/full/](http://127.0.0.1:8001/api/v1/content/full/)
- **CMS Studio**: [http://127.0.0.1:8001/cms/](http://127.0.0.1:8001/cms/)
  - **Superuser**: `admin`
  - **Password**: `adminpassword123`

---

## 🎨 Visual Identity & Color System

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Midnight Navy** | `#111A2B` | Primary deep architectural background |
| **Electric Blue** | `#277DA1` | Structural steel accents & secondary buttons |
| **Neon Cyan** | `#43D9E8` | Glowing neon outlines, badges & active indicators |
| **Retro Cherry Red** | `#D83A45` | Vinyl booths, hero CTAs & marquee highlights |
| **Cherry Cream** | `#F6E9D5` | Warm alternating light sections (`.cream-theme`) |
| **Vintage Ivory** | `#FFF7E8` | High-contrast card surfaces & modals |
| **Chrome Silver** | `#BFC6CC` | Trim, metallic borders & brushed counter bevels |
| **Atomic Yellow** | `#F2C94C` | Starburst accents, ratings & callout badges |

---

## 📋 Comprehensive 15-Section Homepage Specification

1. **S01 — Hero Section**:
   - Right-anchored interactive 3D Retro Diner pavilion (stainless steel cantilever eaves, glowing neon marquee, vinyl stools).
   - High-contrast typography with dark directional gradient veil for readability.
   - Live metrics strip (24 Counter Stools, 18 Booths, 120 Jukebox Tracks).
2. **S02 — Editorial Intro (`.cream-theme`)**:
   - Cream & cherry editorial statement *"A Classic Reimagined."*
   - Brand manifesto balancing 1950s diner nostalgia with neon-infused hospitality.
3. **S03 — Core Philosophy**:
   - 3 interactive pillars: *Pure Nostalgia, Modern Technique, The Electric Social Atmosphere*.
4. **S04 — Signature Dishes Showcase**:
   - High-impact visual cards highlighting: *Atomic Smash Burger, Stardust Pastrami Melt, Electric Neon Cherry Shake, Cosmic Truffle Fries*.
   - Interactive recipe preview modal with ingredients, dietary tags, and direct reservation triggers.
5. **S05 — Comprehensive Menu Explorer**:
   - Real-time tabbed categorization (All, Burgers, Mains, Shakes, Cocktails, Sides, Desserts).
   - Instant search and dietary filter tags (Gluten-Free, Vegetarian, House Favorite).
   - Retro combo deal highlight banner.
6. **S06 — The Diner Story (`.cream-theme`)**:
   - 4-stage chronological evolution of Stardust Diner from vintage highway roadhouse to futuristic culinary icon.
7. **S07 — Diner Architecture & Materiality**:
   - Deep dive into architectural tactile materials: *Streamlined Chrome, Cherry Red Vinyl, Checkerboard Ceramics, Neon Light Tubes*.
8. **S08 — 3D Virtual Restaurant Tour**:
   - Interactive 3D viewpoint switcher exploring 5 spatial zones: *Main Counter & Stools, Neon Booth Alley, Retro Jukebox Lounge, Open-Fire Grill Station, The Cocktail Bar*.
   - Pulsing neon coordinate hotspots with spatial camera fly-throughs.
9. **S09 — The Diner Experience**:
   - 3 atmosphere modules: *The Vibe, The People, The Late-Night Energy*.
10. **S10 — Visual Gallery & Lightbox**:
    - Filterable photo masonry grid (Interior, Food, Bar, Atmosphere) with fullscreen lightbox view.
11. **S11 — Guest Testimonials**:
    - 5-star critic & guest reviews with retro atomic badges and verified seating tags.
12. **S12 — Interactive Reservation Inquiry Desk**:
    - Live booking form with instant validation, date/time pickers, zone selection, party size, and dietary notes.
    - Connects directly to Django backend producing persistent `RETRO-XXXXXX` confirmation numbers.
13. **S13 — Location, Hours & Interactive Map**:
    - Stylized neon blueprint schematic map with driving directions and transit coordinates.
14. **S14 — Frequently Asked Questions (`.cream-theme`)**:
    - 8-item interactive FAQ accordion addressing walk-ins, parking, private events, and dietary accommodations.
15. **S15 — Closing Footer**:
    - 4-column logistics layout with quick navigation, hours, coordinates, social channels, and CMS studio shortcut.

---

## 🛠️ CMS Studio Modules (`/cms/`)

The CMS features a permanent left architectural navigation sidebar (`#cmsSidebar`) with real-time `#sidebarFilter` instant search:

- **Module 1 — Telemetry & Overview**: Live KPI counters for total reservations, pending reviews, active dishes, and viewpoints.
- **Module 2 — Brand & Restaurant Settings**: Direct editing of diner name, tagline, address, phone, email, and social handles.
- **Module 3 — Reservation Triage Desk**: Real-time management of guest reservations with status updates (`pending`, `confirmed`, `seated`, `cancelled`).
- **Module 4 — Menu Item Manager**: Availability toggles (`is_available`, `is_signature`), price overrides, and dietary tags.
- **Module 5 — Virtual Tour Viewpoints**: Coordinates editor (`camera_x`, `camera_y`, `camera_z`), hotspot titles, and descriptions.
- **Module 6 — Editorial & Philosophy**: CMS controls for homepage section headers, story stages, and philosophy pillars.
- **Module 7 — Gallery Asset Manager**: Caption, category, and display order curation for the photo gallery.
- **Module 8 — Testimonials Curation**: Critic reviews, ratings, and guest quotes.
- **Module 9 — FAQ Content Manager**: Accordion question and answer administration.
- **Module 10 — Master JSON Configuration**: Raw JSON backup and instant configuration sync.

---

## 🧪 Verification & Testing

An end-to-end verification script (`verify_project6.py`) automates:
- Backend REST API endpoints verification (`/api/v1/content/full/` and `/api/v1/reservations/`).
- CMS login session authentication and permanent left sidebar DOM validation.
- Frontend React DOM mounting, 3D WebGL Canvas detection, modal interactions, and screenshot captures.
