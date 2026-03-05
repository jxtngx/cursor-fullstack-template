.PHONY: help install dev build test clean docker-up docker-down

help:
	@echo "Available commands:"
	@echo "  make install      - Install all dependencies"
	@echo "  make dev          - Start development servers"
	@echo "  make build        - Build both frontend and backend"
	@echo "  make test         - Run all tests"
	@echo "  make docker-up    - Start all services with Docker Compose"
	@echo "  make docker-down  - Stop all Docker services"
	@echo "  make clean        - Clean build artifacts"

install:
	cd backend && make install
	cd frontend && make install

dev:
	@echo "Starting development servers..."
	@echo "Backend: http://localhost:8000"
	@echo "Frontend: http://localhost:3000"
	docker compose up postgres localstack -d
	cd backend && make dev &
	cd frontend && make dev

build:
	cd backend && make build
	cd frontend && make build

test:
	cd backend && make test
	cd frontend && make test

docker-up:
	docker compose up -d

docker-down:
	docker compose down

clean:
	cd backend && make clean
	cd frontend && make clean
	docker compose down -v
