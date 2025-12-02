# ShipPal Backend

The backend service for ShipPal, powered by **Python**, **FastAPI**, and **Supabase**. It handles the core business logic, including the AI matchmaking algorithms, document generation agents, and database management.

## Prerequisites

-   Python 3.12+
-   Poetry (Dependency Management)
-   Supabase CLI (for local database development)

## Installation

1.  Navigate to the backend directory:
    ```bash
    cd shippal-backend
    ```

2.  Install dependencies using Poetry:
    ```bash
    poetry install
    ```

3.  Set up environment variables:
    Create a `.env` file in the `shippal-backend` directory with your credentials.
    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_KEY=your_service_role_key
    OPENROUTER_BASE_URL=https://api.openrouter.ai
    OPENROUTER_API_KEY=your_openrouter_key
    OPENROUTER_MODEL_ID=your_openrouter_model_id
    ```

## Development

We use `poethepoet` for task management.

-   **Run the server**:
    ```bash
    poetry run poe dev
    ```
    This will start the FastAPI server using `uvicorn`.

-   **Linting**:
    ```bash
    poetry run poe lint
    ```

-   **Formatting**:
    ```bash
    poetry run poe format
    ```

-   **Security Check**:
    ```bash
    poetry run poe security
    ```

## Database

This project uses Supabase (PostgreSQL). Migrations and configuration are located in the `supabase/` directory.

## AI Agents

The backend utilizes **Strands Agents** to power features like:
-   **Matchmaking**: Analyzing buyer/seller data to find optimal pairs.
-   **Compliance**: Generating and validating export documents.
