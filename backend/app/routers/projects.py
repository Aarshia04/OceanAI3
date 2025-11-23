from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Project, DocumentConfig
from app.schemas.projects import ProjectCreate, Project as ProjectSchema
from app.services.auth import get_current_user

router = APIRouter()


@router.get("", response_model=list[ProjectSchema])
def list_projects(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Project).filter(Project.owner_id == current_user.id).all()


@router.post("", response_model=ProjectSchema)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    project = Project(name=payload.name, description=payload.description, owner_id=current_user.id)
    db.add(project)
    db.commit()
    db.refresh(project)

    config = DocumentConfig(
        project_id=project.id,
        doc_type=payload.document_config.doc_type,
        title=payload.document_config.title,
        metadata=payload.document_config.metadata,
    )
    db.add(config)
    db.commit()
    db.refresh(project)
    return project


@router.get("/{project_id}", response_model=ProjectSchema)
def get_project(project_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
