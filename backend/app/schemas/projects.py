from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class DocumentConfigBase(BaseModel):
    doc_type: str
    title: Optional[str] = None
    metadata: Optional[dict] = None


class DocumentConfigCreate(DocumentConfigBase):
    pass


class GeneratedContentBase(BaseModel):
    section: str
    content: str


class RefinementHistoryBase(BaseModel):
    section: str
    prompt: str
    result: str


class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None


class ProjectCreate(ProjectBase):
    document_config: DocumentConfigCreate


class Project(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    document_config: Optional[DocumentConfigCreate]
    generated_content: List[GeneratedContentBase] = []
    refinement_history: List[RefinementHistoryBase] = []

    class Config:
        orm_mode = True
