# СИМ — Работно Облекло 🦺

A full-stack product catalog website built for a family-owned workwear store in Gabrovo, Bulgaria. Designed, architected, and deployed entirely by one developer as a real-world learning project.

**🌐 Live site:** [sim-obleklo.bg](https://sim-obleklo.bg)  
**🛠️ Stack:** Django · Next.js 14 · PostgreSQL · Docker · Cloudflare · Nginx Proxy Manager

---

## Overview

A modern, SEO-friendly product catalog with a headless CMS architecture. The store owner manages all content — products, categories, images, store info — through a Bulgarian-language Django admin panel with no coding required. The Next.js frontend fetches data from a Django REST Framework API and renders pages server-side for fast load times and strong search engine visibility.

This project was built end-to-end: discovery and planning, data modelling, REST API design, frontend development, UI/UX design, production infrastructure, CI/CD pipeline, domain registration, DNS configuration, SSL certificates, and ongoing debugging across the full stack.

---

## Features ✨

- Product catalog with category browsing, brand filtering, and tag-based filtering
- Full-text search across products
- Server-side rendering and ISR (Incremental Static Regeneration) for SEO
- Image storage and delivery via Cloudinary CDN
- Contact form with transactional email delivery via Resend
- Bot protection on contact form via Cloudflare Turnstile (invisible challenge)
- API rate limiting — 60 requests/min per IP via DRF throttling
- Bulgarian-language admin panel for non-technical store owner
- Fully responsive, mobile-first design with animated Framer Motion components
- Parent/child category hierarchy with expandable sidebar navigation
- Animated hamburger menu with CSS transform transitions
- Home page sections: hero, about snippet, categories, featured products, "why choose us", contact with Google Maps embed
- Custom 404 page
- Auto-generated sitemap.xml and robots.txt via next-sitemap
- JSON-LD structured data ready for SEO

---

## Tech Stack 🛠️

| Layer | Technology | Notes |
|---|---|---|
| Backend | Django 5 + Django REST Framework | Professional experience; chosen to ship fast and focus learning on Next.js |
| Frontend | Next.js 14 (App Router, TypeScript) | SSR/ISR for SEO; first real Next.js project |
| Styling | Tailwind CSS | Utility-first, mobile-first |
| Animation | Framer Motion | Category sidebar, page transitions |
| Database | PostgreSQL 16 | Reliable, fits Django ORM perfectly |
| Image Storage | Cloudinary | Auto-optimization, CDN delivery, survives container restarts |
| Email | Resend | Transactional email API, free tier |
| Bot Protection | Cloudflare Turnstile | Invisible CAPTCHA alternative on contact form |
| Containerization | Docker + Docker Compose | Identical dev and production environments |
| Reverse Proxy | Nginx Proxy Manager | Already running in homelab; no new service needed |
| CI/CD | GitHub Actions | Auto-deploy on push to `main` |
| Hosting | Personal homelab (Dell OptiPlex 7040) | Free; remote access via WireGuard VPN |
| DNS + CDN | Cloudflare (free) | DDoS protection, SSL termination, hides home IP |
| Remote Access | WireGuard VPN | Split-tunnel; developer always works remotely |
| Monitoring | Uptime Kuma | Self-hosted uptime monitoring with alerts |

---

## Architecture

```
Browser
  ↓ HTTPS
Cloudflare (DNS + CDN + DDoS protection + SSL termination)
  ↓ HTTP (internal)
Nginx Proxy Manager (reverse proxy + Let's Encrypt SSL on origin)
  ↓
  ├── workwear-catalog-frontend-1:3000  (Next.js)
  │       ↓ server-side fetch
  └── workwear-catalog-backend-1:8000   (Django + Gunicorn)
          ↓
      PostgreSQL (pgdata Docker volume)
          +
      static_files Docker volume (served directly by NPM for /static/)
          +
      Cloudinary (media/product images)
```

**CI/CD flow:**
```
Developer (Linux Mint laptop)
  ↓ push to main
GitHub Actions
  ↓ SSH into homelab server
  ↓ git pull + docker compose up --build
Dell OptiPlex 7040 homelab server (Ubuntu Server)
  ↓
Cloudflare → public internet → customers
```

---

## Security

Defence in depth — multiple independent layers, each handling a different threat:

| Layer | What it protects against |
|---|---|
| Cloudflare | DDoS, volumetric attacks, malicious bots before they reach the server |
| Cloudflare Turnstile | Automated contact form spam and abuse |
| DRF throttling (60 req/min) | API scraping, enumeration, automated abuse |
| Fail2ban | SSH brute-force attacks |
| UFW | All ports locked down except 22, 80, 443, 51820 |

**API rate limiting implementation note:** Django's default `LocMemCache` is per-process — with 3 Gunicorn workers, each worker maintains its own independent counter, so a 60/min limit would effectively become 180/min. Fixed by switching to `FileBasedCache`, which writes counters to a shared directory on the container filesystem that all workers read and write together.

---

## Infrastructure Notes

This project is hosted on a personal homelab server rather than a cloud VPS. This was a deliberate decision and a significant part of the learning experience.

- **Server:** Dell OptiPlex 7040 SFF (i5-6500, 16GB RAM, Ubuntu Server 26.04 LTS)
- **Remote access:** WireGuard VPN with split tunnel — only homelab traffic routes through the VPN
- **Development workflow:** VS Code Remote SSH editing files directly on the server
- **Home IP exposure:** Cloudflare proxy (orange cloud) hides the real home IP from the public internet
- **Resilience:** All Docker containers run with `restart: unless-stopped` — if the server reboots, everything comes back automatically
- **Dynamic IP:** A cron job checks the current public IP every 5 minutes and updates the Cloudflare A record via API if it has changed

---

## Local Development 🚀

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

### First Run

```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

---

## Environment Variables

See `.env.example` for all required variables:

```
DATABASE_URL
SECRET_KEY
DEBUG
ALLOWED_HOSTS
CSRF_TRUSTED_ORIGINS
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RESEND_API_KEY
CONTACT_EMAIL
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_TURNSTILE_SITE_KEY
DB_PASSWORD
```

`TURNSTILE_SECRET_KEY` is required in `.env.production` on the server (never committed to Git).

**Note on `NEXT_PUBLIC_` variables:** Next.js bakes these into the JavaScript bundle at build time, not runtime. They must be passed to the Docker build as build args — see `docker-compose.prod.yml` and `Dockerfile.prod`.

---

## Project Structure 📁

```
workwear-catalog/
├── backend/
│   ├── config/
│   │   ├── settings.py           # Django settings (throttling, cache, CSRF)
│   │   └── urls.py
│   ├── products/
│   │   ├── models.py             # All data models
│   │   ├── serializers.py        # DRF serializers (list + detail)
│   │   ├── views.py              # API views with filtering
│   │   ├── admin.py              # Bulgarian admin with fieldsets
│   │   └── migrations/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── Dockerfile.prod
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── shop/
│   │   │   ├── page.tsx          # Catalog with filters
│   │   │   ├── ShopFilters.tsx   # Client component — URL-based filters
│   │   │   └── [slug]/page.tsx   # Product detail (ISR)
│   │   ├── categories/[slug]/    # Category pages
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page + Turnstile-protected form
│   │   └── api/contact/          # Server-side email handler with Turnstile verification
│   ├── components/
│   │   ├── Navbar.tsx            # Animated hamburger menu
│   │   └── Footer.tsx            # Dynamic footer (fetches StoreInfo)
│   ├── lib/
│   │   ├── api.ts                # API client with server/client URL detection
│   │   └── types.ts              # TypeScript interfaces
│   ├── next.config.mjs
│   ├── next-sitemap.config.js
│   ├── Dockerfile
│   └── Dockerfile.prod           # Multi-stage build with ARG for public env vars
├── docker-compose.yml            # Development
├── docker-compose.prod.yml       # Production (includes build args for frontend)
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Actions CI/CD
```

---

## API Endpoints

```
GET  /api/products/           List products (?category, ?brand, ?tag, ?search, ?featured)
GET  /api/products/{slug}/    Product detail
GET  /api/categories/         Category list with nested children
GET  /api/brands/             Brand list
GET  /api/tags/               Tag list
GET  /api/store-info/         Store details (address, hours, contact)
POST /api/contact/            Contact form submission
```

All anonymous API endpoints are throttled at 60 requests/min per IP.

---

## Data Model

| Model | Description |
|---|---|
| **Category** | Hierarchical (parent/child via self-referential FK), slug-based URLs |
| **Brand** | Filterable, with logo and description |
| **Tag** | Many-to-many with products (waterproof, flame resistant, EN ISO certified, etc.) |
| **Product** | Belongs to category and brand; has tags, images, variants, safety_rating field |
| **ProductImage** | Multiple images per product, primary image flag, ordering |
| **ProductVariant** | Size and color variants — display only, no stock tracking |
| **StoreInfo** | Single-instance model; opening hours stored as JSON array to preserve day order |

**Why JSON array for opening hours:**
Django reorders JSON object keys alphabetically on save. `{"Неделя": ..., "Понеделник": ...}` — the days end up alphabetically sorted, not logically sorted. Storing as `[{"day": "Пон - Петък", "hours": "..."}, ...]` preserves insertion order.

---

## Key Implementation Decisions

### Server vs Client Components (Next.js App Router)
Pages that only display data are Server Components — they fetch directly with `async/await`, no `useEffect`, no loading states, better SEO. Components that need interactivity (`ShopFilters`, `Navbar`, `ContactForm`) are Client Components with `'use client'`.

### API URL Detection
```typescript
const SERVER_API_URL = 'http://backend:8000';   // Docker service name — used server-side
const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL;  // Public URL — used in browser
const API_URL = typeof window === 'undefined' ? SERVER_API_URL : CLIENT_API_URL;
```
Server Components running inside Docker use the container name. Browser requests use the public URL. Without this split, server-side fetches would try `localhost:8000` which resolves to the frontend container itself — not Django.

### URL-based Filtering
Catalog filters are stored in URL query params (`?category=uniforms&brand=portwest`). Shareable, bookmarkable, and Google-indexable. The `ShopFilters` client component updates the URL via `router.push()`, triggering a server component re-render with new `searchParams`.

### ISR Caching
All API fetches use `next: { revalidate: 60 }` — 60 second cache with background revalidation. Product pages stay fast and fresh without a full rebuild on every content change.

### Rate Limiting with Shared Cache
DRF's `AnonRateThrottle` counts requests per IP using Django's cache backend. Django's default `LocMemCache` is per-process — each Gunicorn worker has its own independent counter, making the throttle ineffective in a multi-worker setup. `FileBasedCache` solves this by writing counters to a shared directory on the container filesystem, giving all workers a single shared counter.

### Cloudflare Turnstile Integration
The contact form uses Cloudflare's Turnstile widget for bot protection. The browser receives a one-time token after an invisible challenge. The Next.js API route verifies that token against Cloudflare's siteverify endpoint before sending any email. The submit button is disabled until a valid token is received, making automated submissions impossible.

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` must be available at Docker build time (not runtime) because Next.js bakes `NEXT_PUBLIC_` variables into the JS bundle during `npm run build`. It is passed via Docker build args in `docker-compose.prod.yml` rather than copied from `.env.production` (which lives outside the Docker build context).

### Static Files in Production
Django does not serve static files when `DEBUG=False` — this is by design. In production, a Docker volume (`static_files`) is shared between the Django container and Nginx Proxy Manager. NPM serves `/static/` requests directly from disk via an `alias` directive, bypassing Django entirely.

```nginx
location /static/ {
    alias /staticfiles/;
    autoindex off;
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

---

## Problems Encountered & Fixed

This project involved significant real-world debugging across infrastructure, networking, and application layers. Some highlights:

**Docker networking:** Next.js Server Components inside Docker tried `http://localhost:8000` which resolves to the frontend container itself. Fixed by splitting API URLs — container name for server-side, public URL for client-side.

**PostgreSQL password mismatch:** PostgreSQL only reads `POSTGRES_PASSWORD` on first volume initialization. Changing the env var later has no effect. Fixed with `ALTER USER postgres PASSWORD '...'` directly in the database.

**Opening hours JSON key ordering:** Django reorders JSON object keys alphabetically on save — weekdays appeared out of order. Fixed by switching from a JSON object to a JSON array of `{day, hours}` objects.

**WireGuard + systemd-resolved conflict:** Disabling `systemd-resolved` broke WireGuard's DNS management on startup (`Unit dbus-org.freedesktop.resolve1.service not found`), causing the tunnel to fail silently after every reboot. Fixed by removing the `DNS =` line from the WireGuard config — WireGuard no longer manages DNS and starts cleanly.

**Cloudflare + NPM redirect loop:** Cloudflare strips SSL and forwards HTTP to the origin server. NPM's "Force SSL" saw HTTP and redirected to HTTPS — which went back to Cloudflare, which forwarded as HTTP again. Infinite 301 loop. Fixed by disabling Force SSL on the API proxy host (Cloudflare handles HTTPS externally) and setting Cloudflare SSL mode to Full (strict).

**NPM custom location overwriting:** Every time a proxy host is saved through NPM's UI, it regenerates the Nginx config and injects `proxy_pass` into custom location blocks, overriding the `alias` directive. In Nginx, `proxy_pass` and `alias` cannot coexist — `proxy_pass` wins and the file serving breaks. Fix: move the static location config to NPM's Advanced tab (server-level custom Nginx configuration field), which NPM does not overwrite on save.

**collectstatic 0 files bug:** `python manage.py collectstatic` reported "0 files copied" to an empty directory. Root cause: the `staticfiles` directory on the host was owned by `root` (created by Docker), so Django could list files but couldn't write. Fixed with `sudo chown -R max:max ./backend/staticfiles`.

**CSRF 403 on admin login:** Requests arriving through Cloudflare have the domain in the `Host` header. Django's CSRF protection rejects form submissions unless the origin domain is explicitly trusted. Fixed by adding `CSRF_TRUSTED_ORIGINS` to settings.

**Let's Encrypt email rejection:** NPM had auto-generated `max@homelab.local` as the ACME account email. Let's Encrypt rejected it as invalid. Fixed by updating the NPM admin profile email to a real address before requesting certificates.

**DNS challenge propagation timing:** Certbot created the TXT record in Cloudflare but Let's Encrypt verified before it had propagated. Fixed by setting Propagation Seconds to 120 in NPM.

**DRF throttling not firing with multiple Gunicorn workers:** All 65 test requests returned 200 despite a 60/min limit. Root cause: Django's default `LocMemCache` is per-process. With 3 workers each seeing ~22 requests, none ever reached 60. Fixed by switching to `FileBasedCache` — all workers share the same on-disk counters.

**`NEXT_PUBLIC_` variable undefined in production bundle:** Turnstile's site key was `undefined` in the browser despite being in `.env.production`. Root cause: `.env.production` lives outside the Docker build context (`frontend/` directory), so Docker never copies it into the build. Next.js bakes `NEXT_PUBLIC_` variables at build time, not runtime — if the variable isn't present during `npm run build`, the bundle contains `undefined` forever. Fixed by passing the value as a Docker build arg in `docker-compose.prod.yml` and declaring it as `ARG` + `ENV` in `Dockerfile.prod`.

**Docker layer cache serving stale build:** After adding the env var, rebuilding without `--no-cache` finished in 1.4 seconds with all steps marked `CACHED` — the bundle still contained `undefined`. Docker saw no source file changes and reused the previous build entirely. Fixed with `docker compose build --no-cache frontend`.

---

## Deployment

Production uses a separate `docker-compose.prod.yml`:
- Backend runs Gunicorn (`--workers 3`) instead of Django's dev server
- Frontend uses a multi-stage Docker build — only the `.next/standalone` output is included, no source code or node_modules
- Frontend build receives `NEXT_PUBLIC_TURNSTILE_SITE_KEY` as a build arg from `.env.production`
- Containers use `expose` instead of `ports` — not directly accessible from host, only through NPM
- Environment variables loaded from `.env.production` (not in Git)

GitHub Actions deploys on every push to `main`:
```yaml
- SSH into server
- git pull origin main
- docker compose -f docker-compose.prod.yml up -d --build
- docker compose exec backend python manage.py migrate
- docker image prune -f
```

---

## Roadmap & Known Issues

### Known Issues
- **collectstatic not automated:** Static files were copied manually for the initial deployment. The GitHub Actions pipeline does not run `collectstatic` automatically due to a TTY compatibility issue with `docker compose exec -T`. Run manually after Django upgrades using `manage.py shell -c "from django.core.management import call_command; call_command('collectstatic', interactive=False)"`.

### Planned Improvements
- Upgrade Next.js from 14.x (has known CVEs: DoS, cache poisoning, HTTP request smuggling)
- Category image overlays — the `Category.image` field exists in the model; needs category images uploaded first
- Animated product photos section on home page (Framer Motion horizontal scroll with hover)
- Google Search Console setup and sitemap submission
- Google Business Profile for local SEO in Gabrovo
- Dynamic ISR webhook — Django fires a webhook when a product is saved, Next.js revalidates immediately instead of waiting 60 seconds

### Future: E-commerce Expansion
The catalog architecture was designed to extend cleanly into e-commerce without rebuilding:
- `Order` model + Stripe Checkout integration
- Cart state with Zustand (persisted to localStorage)
- Stock tracking on `ProductVariant`
- Celery + RabbitMQ for async order processing and email queues
- Order confirmation emails via Resend

---

## Author

**Maxim Simeonov Ivanov**

- maksimivanov@tutamail.com
- https://github.com/MaximSimeonovIvanov