# СИМ - Работно Облекло

A full-stack product catalog website for a family-owned workwear store in Gabrovo, Bulgaria.

**Live site:** https://sim-obleklo.bg  
**Stack:** Django · Next.js 14 · PostgreSQL · Docker · Cloudinary

---

## Overview

A modern, SEO-friendly product catalog built with a headless CMS architecture. The store owner manages all content (products, categories, images, store info) through a Bulgarian-language Django admin panel with no coding required. The Next.js frontend fetches data from a Django REST Framework API and renders pages server-side for fast load times and strong search engine visibility.

---

## Features

- Product catalog with category browsing and tag-based filtering
- Full-text search across products
- Server-side rendering and ISR for SEO
- Image storage via Cloudinary CDN
- Contact form with email delivery via Resend
- Bulgarian-language admin panel for non-technical store owner
- Fully responsive, mobile-first design
- Parent/child category hierarchy
- Brand and tag filtering

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django 5 + Django REST Framework |
| Frontend | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | PostgreSQL 16 |
| Image Storage | Cloudinary |
| Email | Resend |
| Containerization | Docker + Docker Compose |
| Reverse Proxy | Nginx Proxy Manager |
| CI/CD | GitHub Actions |
| Hosting | Hetzner VPS |
| DNS + CDN | Cloudflare |

---

## Architecture

Browser → Cloudflare CDN → Nginx Proxy Manager
↓
Next.js (port 3000)
↓
Django REST API (port 8000)
↓
PostgreSQL (port 5432)

Images are stored on Cloudinary and served via their CDN. Contact form submissions are processed server-side and delivered via Resend.

---

## Local Development

### Prerequisites
- Docker and Docker Compose
- Git

### Setup

```bash
git clone https://github.com/MaximSimeonovIvanov/workwear-catalog-website.git
cd workwear-catalog-website

cp .env.example .env
# Fill in your values in .env

docker compose up --build
```

### Services
| Service | URL |
|---|---|
| Next.js frontend | http://localhost:3000 |
| Django API | http://localhost:8000 |
| Django admin | http://localhost:8000/admin |

### First run
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

---

## Environment Variables

See `.env.example` for all required variables:

DATABASE_URL
SECRET_KEY
DEBUG
ALLOWED_HOSTS
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RESEND_API_KEY
CONTACT_EMAIL
NEXT_PUBLIC_API_URL

---

## Project Structure

workwear-catalog/
├── backend/                  # Django project
│   ├── config/               # Settings, URLs
│   ├── products/             # Models, API views, serializers, admin
│   └── requirements.txt
├── frontend/                 # Next.js project
│   ├── app/                  # App Router pages
│   ├── components/           # Navbar, Footer
│   └── lib/                  # API client, TypeScript types
├── docker-compose.yml
└── .env.example

---

## API Endpoints

GET /api/products/              List products (supports ?category, ?brand, ?tag, ?search, ?featured)
GET /api/products/{slug}/       Product detail
GET /api/categories/            Category list with children
GET /api/brands/                Brand list
GET /api/tags/                  Tag list
GET /api/store-info/            Store details
POST /api/contact/              Contact form (Django endpoint - unused, handled by Next.js)

---

## Data Model

- **Category** — hierarchical (parent/child), slug-based URLs
- **Brand** — filterable, with logo
- **Tag** — many-to-many with products (waterproof, flame resistant, etc.)
- **Product** — belongs to category and brand, has many tags, images, and variants
- **ProductImage** — multiple images per product, primary image flag
- **ProductVariant** — size and color variants (display only)
- **StoreInfo** — single-instance model for store details and opening hours