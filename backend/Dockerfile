# Use uv's Python 3.12 Alpine image
FROM ghcr.io/astral-sh/uv:python3.12-alpine3.23

# Set working directory
WORKDIR /app

# Copy dependency files
COPY pyproject.toml .

# Install dependencies
RUN uv sync --no-dev

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
