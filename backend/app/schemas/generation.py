from pydantic import BaseModel


class GenerateRequest(BaseModel):
    project_id: int
    prompt: str


class RefineRequest(BaseModel):
    project_id: int
    section: str
    prompt: str
