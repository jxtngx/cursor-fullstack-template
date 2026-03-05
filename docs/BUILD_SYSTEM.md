# Build System Documentation

This document provides comprehensive documentation for the cursor-fullstack-template build system.

## Table of Contents

- [Quick Start](#quick-start)
- [Makefile Commands](#makefile-commands)
- [Development Workflow](#development-workflow)
- [Docker Setup](#docker-setup)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Local Development (No Docker)

For local development without containerization:

```bash
# 1. Install all dependencies
make install

# 2. Start development servers
make dev
```

This will:
- Install backend dependencies with `uv`
- Install frontend dependencies with `pnpm`
- Start PostgreSQL and LocalStack in Docker
- Run backend dev server on http://localhost:8000
- Run frontend dev server on http://localhost:3000

### Full Docker Environment

For complete containerized development:

```bash
# Start all services
make docker-up

# View logs from all services
docker compose logs -f

# View logs from specific service
docker compose logs -f backend

# Stop all services
make docker-down
```

## Makefile Commands

### Root Makefile Commands

Located at the project root, these commands orchestrate both frontend and backend:

| Command | Description |
|---------|-------------|
| `make help` | Display all available commands |
| `make install` | Install dependencies for both frontend and backend |
| `make dev` | Start development servers |
| `make build` | Build Docker images for both services |
| `make test` | Run all tests |
| `make docker-up` | Start all services with Docker Compose |
| `make docker-down` | Stop all Docker services |
| `make clean` | Clean build artifacts and stop Docker |

### Backend Commands

Run from the `backend/` directory:

| Command | Description |
|---------|-------------|
| `make help` | Display backend commands |
| `make install` | Install Python dependencies with uv |
| `make dev` | Run development server with hot reload |
| `make build` | Build Docker image |
| `make test` | Run pytest tests |
| `make format` | Format code with ruff |
| `make lint` | Lint code with ruff |
| `make clean` | Clean Python cache files |

### Frontend Commands

Run from the `frontend/` directory:

| Command | Description |
|---------|-------------|
| `make help` | Display frontend commands |
| `make install` | Install Node dependencies with pnpm |
| `make dev` | Run Next.js dev server |
| `make build` | Build production bundle |
| `make start` | Start production server |
| `make test` | Run tests |
| `make format` | Format code with prettier |
| `make lint` | Lint code with eslint |
| `make clean` | Clean build artifacts and node_modules |

## Development Workflow

### First Time Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd cursor-fullstack-template
   ```

2. **Install dependencies**
   ```bash
   make install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Start development**
   ```bash
   make dev
   ```

### Daily Development

1. **Start services**
   ```bash
   make docker-up  # Start database and LocalStack
   ```

2. **Start dev servers**
   ```bash
   make dev  # Starts both frontend and backend
   ```

3. **Make code changes** - Hot reload is enabled
   - Backend: FastAPI with uvicorn reload
   - Frontend: Next.js hot module replacement

4. **Run tests**
   ```bash
   make test
   ```

5. **Clean up**
   ```bash
   make docker-down
   ```

### Working on Individual Services

**Backend only:**
```bash
cd backend
make install
make dev
```

**Frontend only:**
```bash
cd frontend
make install
make dev
```

## Docker Setup

### Services Overview

The Docker Compose setup includes four services:

```mermaid
graph TD
    Frontend[Frontend:3000] --> Backend[Backend:8000]
    Backend --> Postgres[PostgreSQL:5432]
    Backend --> LocalStack[LocalStack:4566]
```

#### 1. PostgreSQL Database
- **Image**: `postgres:16-alpine`
- **Port**: 5432
- **Default credentials**: postgres/postgres
- **Database**: cursor_db
- **Health check**: Automatic with pg_isready

#### 2. LocalStack
- **Image**: `localstack/localstack:latest`
- **Ports**: 4566 (main), 4571 (additional)
- **Services**: Bedrock, S3, Secrets Manager, DynamoDB
- **Health check**: HTTP endpoint

#### 3. Backend API
- **Base image**: `ghcr.io/astral-sh/uv:python3.12-alpine3.23`
- **Port**: 8000
- **Hot reload**: Enabled via volume mount
- **Dependencies**: Waits for postgres and localstack

#### 4. Frontend
- **Base image**: `node:22-alpine`
- **Port**: 3000
- **Hot reload**: Enabled via volume mount
- **Dependencies**: Waits for backend

### Building Docker Images

```bash
# Build all images
make build

# Build individual images
cd backend && make build
cd frontend && docker build -t cursor-frontend .

# Build with no cache
docker compose build --no-cache
```

### Managing Services

```bash
# Start all services in background
make docker-up

# Start with logs in foreground
docker compose up

# Start specific services
docker compose up postgres localstack

# Restart a service
docker compose restart backend

# Stop all services
make docker-down

# Stop and remove volumes
docker compose down -v
```

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend

# Last 100 lines
docker compose logs --tail=100 backend
```

### Accessing Services

```bash
# Backend API health check
curl http://localhost:8000

# Frontend
curl http://localhost:3000

# PostgreSQL
psql postgresql://postgres:postgres@localhost:5432/cursor_db

# LocalStack health
curl http://localhost:4566/_localstack/health
```

## Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/cursor_db` |
| `AWS_REGION` | AWS region | `us-east-1` |
| `AWS_ENDPOINT_URL` | LocalStack endpoint | `http://localhost:4566` |
| `NEXT_PUBLIC_API_URL` | Backend API URL for frontend | `http://localhost:8000` |

### Optional Variables (MCP Integrations)

| Variable | Description |
|----------|-------------|
| `NOTION_API_KEY` | Notion API key for documentation sync |
| `LINEAR_API_KEY` | Linear API key for issue tracking |
| `DISCORD_BOT_TOKEN` | Discord bot token for notifications |

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Bind for 0.0.0.0:8000 failed: port is already allocated`

**Solution**:
```bash
# Find process using the port
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or change the port in Compose.yaml
```

#### 2. Docker Build Fails

**Error**: `failed to solve with frontend dockerfile.v0`

**Solution**:
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker compose build --no-cache
```

#### 3. uv Not Found

**Error**: `command not found: uv`

**Solution**:
```bash
# Install uv
pip install uv

# Or via curl
curl -LsSf https://astral.sh/uv/install.sh | sh
```

#### 4. pnpm Not Found

**Error**: `command not found: pnpm`

**Solution**:
```bash
# Install pnpm
npm install -g pnpm

# Or via corepack
corepack enable
corepack prepare pnpm@latest --activate
```

#### 5. PostgreSQL Connection Failed

**Error**: `could not connect to server`

**Solution**:
```bash
# Check if postgres is running
docker compose ps

# Check logs
docker compose logs postgres

# Restart postgres
docker compose restart postgres
```

#### 6. LocalStack Not Healthy

**Error**: `localstack health check failed`

**Solution**:
```bash
# Check LocalStack logs
docker compose logs localstack

# Restart LocalStack
docker compose restart localstack

# Test health endpoint
curl http://localhost:4566/_localstack/health
```

### Performance Tips

1. **Use volume caching for node_modules**
   - Already configured in Compose.yaml
   - Prevents reinstalling on container restart

2. **Use uv for faster Python installs**
   - 10-100x faster than pip
   - Already configured in backend

3. **Enable BuildKit for faster Docker builds**
   ```bash
   export DOCKER_BUILDKIT=1
   ```

4. **Use pnpm for efficient package management**
   - Saves disk space with content-addressable storage
   - Already configured in frontend

### Debugging

#### Backend Debugging

1. **Add print statements** (auto-reloads)
   ```python
   print(f"Debug: {variable}")
   ```

2. **Use debugger**
   ```python
   import pdb; pdb.set_trace()
   ```

3. **Check logs**
   ```bash
   docker compose logs -f backend
   ```

#### Frontend Debugging

1. **Use browser console**
   - Open DevTools (F12)
   - Check Console and Network tabs

2. **Next.js debug mode**
   ```bash
   NODE_OPTIONS='--inspect' pnpm dev
   ```

3. **Check logs**
   ```bash
   docker compose logs -f frontend
   ```

## Technology Stack

### Backend
- **Language**: Python 3.12
- **Framework**: FastAPI (add to pyproject.toml)
- **Package Manager**: uv (10-100x faster than pip)
- **Base Image**: Alpine Linux (lightweight)

### Frontend
- **Framework**: Next.js 16
- **Runtime**: Node.js 22
- **Package Manager**: pnpm (efficient)
- **Base Image**: Alpine Linux (lightweight)

### Infrastructure
- **Database**: PostgreSQL 16
- **AWS Emulation**: LocalStack
- **Container Orchestration**: Docker Compose v3.8
- **Build Tool**: Make

## Additional Resources

- [uv Documentation](https://github.com/astral-sh/uv)
- [pnpm Documentation](https://pnpm.io)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [LocalStack Documentation](https://docs.localstack.cloud)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Next.js Documentation](https://nextjs.org/docs)

## Support

For issues or questions:
1. Check this documentation
2. Review the example sprint in `.cursor/plans/sprint_01_agentic_chat.md`
3. Check agent coordination guide in `.cursor/AGENT_COORDINATION.md`
4. Open an issue in the repository
