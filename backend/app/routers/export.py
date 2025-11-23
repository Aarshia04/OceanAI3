from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from tempfile import NamedTemporaryFile

from app.db.database import get_db
from app.models import Project, GeneratedContent
from app.services.auth import get_current_user
from app.services.export import DocExporter

router = APIRouter()


doc_exporter = DocExporter()


@router.get("/export")
def export_project(project_id: int, format: str = "docx", db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.owner_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    content = db.query(GeneratedContent).filter(GeneratedContent.project_id == project.id).all()
    with NamedTemporaryFile(delete=False, suffix=f".{format}") as tmp:
        output_path = doc_exporter.export(project, content, tmp.name, format=format)
    return FileResponse(output_path, filename=f"project-{project.id}.{format}")
