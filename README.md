# OceanAI

OceanAI combines a FastAPI backend with a modern frontend to deliver an LLM-powered experience. This guide walks you through installing dependencies, configuring environment variables, preparing the SQLite database, and running a demo workflow end to end.

## Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- SQLite (bundled with most Python installations)
- Git

## Installation Overview
1. Clone the repository.
2. Set up the backend virtual environment and install Python dependencies.
3. Install frontend dependencies with npm.
4. Configure required environment variables.
5. Initialize the SQLite database.
6. Run the development servers and test the demo workflow.

## Backend Setup (FastAPI)
1. **Create and activate a virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
   ```

2. **Install dependencies**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **Run the API locally**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   - Replace `app.main:app` with your FastAPI path if different.
   - The interactive docs are available at `http://localhost:8000/docs` when the server is running.

## Frontend Setup
1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

2. **Run the frontend dev server**
   ```bash
   cd frontend
   npm run dev -- --host --port 5173
   ```
   - Adjust the host/port as needed.
   - Visit the printed URL (e.g., `http://localhost:5173`) to access the UI.

## Environment Variables
Create a `.env` file in the project root (and in `frontend/` if the frontend needs environment variables) with at least:

```env
# Backend
JWT_SECRET="change-me-to-a-long-random-string"
LLM_API_KEY="your-llm-provider-key"

# Optional: configure database path
DATABASE_URL="sqlite:///./data/oceanai.db"
```

- `JWT_SECRET`: Used to sign and verify JWTs.
- `LLM_API_KEY`: Key for your preferred LLM provider (e.g., OpenAI, Anthropic).
- `DATABASE_URL`: SQLite URL; defaults shown above keep the database in `data/`.

If the frontend needs the LLM key at build time, define it with your framework’s naming conventions (e.g., `VITE_LLM_API_KEY`).

## Database Setup (SQLite)
1. Ensure the `data/` directory exists:
   ```bash
   mkdir -p data
   ```
2. Initialize the database schema. If Alembic or a migrations tool is configured, run the migrations (example):
   ```bash
   alembic upgrade head
   ```
   If no migrations are present, create the SQLite file by running the app once; FastAPI/ORM models that call `Base.metadata.create_all` will create tables automatically.
3. To inspect the database:
   ```bash
   sqlite3 data/oceanai.db ".tables"
   ```

## Demo Workflow
Follow these steps to see the system in action:

1. **Start the backend** (from project root):
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
2. **Start the frontend** (in a separate terminal):
   ```bash
   cd frontend
   npm run dev -- --host --port 5173
   ```
3. **Open the UI** at `http://localhost:5173`.
4. **Authenticate** using the UI’s sign-up/login flow. The backend will issue a JWT using your `JWT_SECRET`.
5. **Run an LLM request** through the UI (e.g., chat or prompt). The request will call the backend, which forwards it to the configured LLM provider using `LLM_API_KEY`.
6. **Persist data**: interactions and user data are stored in the SQLite database defined by `DATABASE_URL`.
7. **Explore the API**: visit `http://localhost:8000/docs` to try endpoints directly.

## Additional Tips
- Keep your `.env` files out of version control.
- For production, use a stronger `JWT_SECRET`, disable `--reload`, and consider moving to a managed database instead of SQLite.
- If you change ports, update any CORS or proxy configuration accordingly.

