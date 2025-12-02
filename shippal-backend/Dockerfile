# syntax=docker/dockerfile:1
# This Dockerfile expects the build context to be the `shippal-backend` directory.
# Example: docker build -t shippal-backend ./shippal-backend (from root) or docker build -t shippal-backend . (from shippal-backend)

# --- Builder stage: install dependencies with Poetry ---
FROM python:3.12-slim AS builder

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# Update Poetry to the latest version
RUN poetry self update

WORKDIR /app

# Copy only dependency files to leverage Docker cache
COPY pyproject.toml poetry.lock* /app/

# Copy the README file
COPY README.md /app/README.md

# Install dependencies to the global environment (not virtualenv)
# We use --no-root because package-mode is false in pyproject.toml
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-root

# --- Final stage: copy app and run ---
FROM python:3.12-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages

# Copy application code
# We use .dockerignore to exclude unnecessary files
COPY . .

ENV POETRY_VIRTUALENVS_CREATE=false
ENV PYTHONPATH="/usr/local/lib/python3.12/site-packages"
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["python", "main.py"]
