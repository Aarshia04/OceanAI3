from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Project, RefinementHistory
from app.schemas.generation import RefineRequest
from app.services.auth import get_current_user
from app.services.llm import llm_client

router = APIRouter()


@router.post("/refine")
def refine_section(payload: RefineRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == payload.project_id, Project.owner_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    result = llm_client.generate(payload.prompt)
    entry = RefinementHistory(project_id=project.id, section=payload.section, prompt=payload.prompt, result=result)
    db.add(entry)
    db.commit()
    return {"result": result}
