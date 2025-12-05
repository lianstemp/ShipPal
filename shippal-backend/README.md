# ShipPal Backend API

The core intelligence layer of ShipPal, serving as the orchestrator for matchmaking, negotiation, and compliance automation.

## Technology Stack

- **Framework**: FastAPI (Python 3.12+)
- **AI/LLM**: Strands Agents, OpenAI Compatible APIs
- **Database**: Supabase (PostgreSQL + pgvector)
- **Task Runner**: Poe the Poet

## Core Capabilities

### 1. Smart Matching Agent
Analyzes unstructured product requests and supply listings to calculate compatibility scores based on quality, quantity, and logistics parameters.

### 2. Negotiation Coach
A specialized agent that monitors Deal Room chats in real-time, offering price recommendations and negotiation strategies based on historical market data.

### 3. Compliance & Document Generator
Generates legal international trade documents (Commercial Invoice, Packing List) by mapping deal data to country-specific regulatory templates.

## Getting Started

### Prerequisites
- Python 3.12 or higher
- Docker (optional but recommended)
- Supabase Project Credentials

### Installation

#### Method A: Docker (Production-ready)

```bash
docker build -t shippal-backend .
docker run -p 8000:8000 --env-file .env shippal-backend
```

#### Method B: Local Development (with Poetry)

1.  **Install Dependencies**
    ```bash
    poetry install
    ```

2.  **Environment Setup**
    Create a `.env` file:
    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_KEY=your_service_role_key
    LLM_BASE_URL=https://api.kolosal.ai/v1
    LLM_API_KEY=your_llm_api_key
    LLM_MODEL_ID=your_llm_model_id
    ```

3.  **Run Service**
    ```bash
    poetry run poe dev
    ```

## Development Commands

| Command | Description |
| :--- | :--- |
| `poetry run poe dev` | Start dev server with hot reload |
| `poetry run poe lint` | Run linter (Ruff) |
| `poetry run poe format` | Format code (Black/Ruff) |
| `poetry run poe security` | Run security audit |
