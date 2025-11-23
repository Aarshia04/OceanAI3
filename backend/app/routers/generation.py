from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Project, GeneratedContent
from app.schemas.generation import GenerateRequest
from app.services.auth import get_current_user
from app.services.llm import llm_client

router = APIRouter()


@router.post("/generate")
def generate_content(payload: GenerateRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == payload.project_id, Project.owner_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    generated = llm_client.generate(payload.prompt)
    entry = GeneratedContent(project_id=project.id, section="default", content=generated)
    db.add(entry)
    db.commit()
    return {"content": generated}
