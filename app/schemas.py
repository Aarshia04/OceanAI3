from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=6)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProjectCreateRequest(BaseModel):
    name: str = Field(..., min_length=1)


class ProjectResponse(BaseModel):
    id: str
    name: str
    sections: List[str]


class UpdateDocsRequest(BaseModel):
    sections: List[str]


class SectionContentResponse(BaseModel):
    project_id: str
    section: str
    content: str
    refined: bool = False


class ContentGenerateRequest(BaseModel):
    prompt: str


class RefinementRequest(BaseModel):
    content: str
    feedback: Optional[str] = None


class RefinementRecord(BaseModel):
    section: str
    content_before: str
    content_after: str
    feedback: Optional[str]
    refined_at: datetime


class RefinementHistoryResponse(BaseModel):
    project_id: str
    history: List[RefinementRecord]
