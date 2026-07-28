# MEHERAH OS - PRODUCTION DEPLOYMENT GUIDE

This guide covers preparing, building, and launching MEHERAH OS in an enterprise production environment using Docker, Docker Compose, PostgreSQL, Redis, and Nginx with SSL/TLS termination and rate limiting.

---

## 1. Prerequisites & Environment Setup

Ensure the target deployment server has the following packages installed:
*   **Docker Engine** v24.0.0 or higher
*   **Docker Compose** v2.20.0 or higher

Clone your repository to the server and navigate to the project directory:
```bash
git clone https://github.com/your-org/meherah-os.git
cd meherah-os
```

Create a secure `.env` file at the root:
```bash
touch .env
chmod 600 .env # Restrict read/write permissions
```

Populate the `.env` file with production variables:
```env
# Server Variables
PORT=3000
NODE_ENV=production

# Cryptographic Keys (Keep Secret!)
GEMINI_API_KEY=AIzaSyD-Your-Actual-Google-Gemini-Key
ENCRYPTION_SECRET=32_character_hexadecimal_encryption_secret_key

# Database Parameters
DB_PASSWORD=SecurePostgreSQLPasswordGoesHere

# Redis Parameters
REDIS_URL=redis://redis:6379/0
```

---

## 2. Generating SSL/TLS Certificates

In production, you **MUST** obtain a valid SSL/TLS certificate from a certificate authority like **Let's Encrypt** or supply your corporate certificates.

For local, on-premise, or internal sandbox deployments, you can generate self-signed TLS certificates:
```bash
mkdir -p certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/meherah.key \
  -out certs/meherah.crt \
  -subj "/C=UG/ST=Kampala/L=Kampala/O=Meherah/CN=meherah.internal"
```

---

## 3. Deploying with Docker Compose

Launch all core services, including the Express API Server, PostgreSQL DB, Redis cache, and Nginx proxy, with a single command:
```bash
docker-compose up -d --build
```

Verify that all 4 containers are running and healthy:
```bash
docker-compose ps
```

Expected output:
```
NAME                      IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
meherah_nginx_gateway     nginx:alpine        "/docker-entrypoint.…"   nginx               1 minute ago        Up 1 minute         0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
meherah_os_core           meherah-os:latest   "docker-entrypoint.s…"   meherah-os          1 minute ago        Up 1 minute         0.0.0.0:3000->3000/tcp
meherah_postgres          postgres:15-alpine  "docker-entrypoint.s…"   postgres            1 minute ago        Up 1 minute         5432/tcp
meherah_redis             redis:7-alpine      "docker-entrypoint.s…"   redis               1 minute ago        Up 1 minute         6379/tcp
```

To view live, aggregated streaming logs from all services:
```bash
docker-compose logs -f
```

---

## 4. CI/CD Automated Pipelines

The repository includes a ready-to-use GitHub Actions workflow under `.github/workflows/ci-cd.yml` that automates:
1.  **Code Validation**: Formats, lints (`npm run lint`), and compiles TS.
2.  **Automated Testing**: Executes the 8-domain comprehensive test suite (`npm test`).
3.  **Container Building & Registry Release**: Automatically builds the secure Multi-stage Docker Image and pushes it to **GitHub Container Registry (GHCR)** on every successful push to the `main` branch.

To link the GitHub Actions pipeline to your production server:
1.  Install a **GitHub Self-Hosted Runner** on the target server.
2.  Add a production release step to `.github/workflows/ci-cd.yml` pulling the latest image and issuing `docker-compose up -d`.
