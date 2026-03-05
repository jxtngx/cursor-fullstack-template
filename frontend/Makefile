.PHONY: help install dev build test clean format lint

help:
	@echo "Frontend commands:"
	@echo "  make install  - Install dependencies with pnpm"
	@echo "  make dev      - Run development server"
	@echo "  make build    - Build production bundle"
	@echo "  make test     - Run tests"
	@echo "  make format   - Format code"
	@echo "  make lint     - Lint code"
	@echo "  make clean    - Clean build artifacts"

install:
	@command -v pnpm >/dev/null 2>&1 || { echo "Installing pnpm..."; npm install -g pnpm; }
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

test:
	pnpm test

format:
	pnpm prettier --write .

lint:
	pnpm lint

clean:
	rm -rf .next node_modules .turbo
