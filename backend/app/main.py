from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import Base, engine
from app.routers import auth, projects, generation, refinement, export

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-Assisted Document Authoring Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(generation.router, prefix="", tags=["generation"])
app.include_router(refinement.router, prefix="", tags=["refinement"])
app.include_router(export.router, prefix="", tags=["export"])


@app.get("/health")
async def health_check():
    return {"status": "ok"}
