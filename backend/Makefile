.PHONY: help install dev build test clean format lint

help:
	@echo "Backend commands:"
	@echo "  make install  - Install dependencies with uv"
	@echo "  make dev      - Run development server"
	@echo "  make build    - Build Docker image"
	@echo "  make test     - Run tests"
	@echo "  make format   - Format code"
	@echo "  make lint     - Lint code"
	@echo "  make clean    - Clean build artifacts"

install:
	@command -v uv >/dev/null 2>&1 || { echo "Installing uv..."; pip install uv; }
	uv sync

dev:
	uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000

build:
	docker build -t cursor-fullstack-backend:latest .

test:
	uv run pytest tests/ -v

format:
	uv run ruff format .

lint:
	uv run ruff check .

clean:
	rm -rf __pycache__ .pytest_cache .ruff_cache
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
