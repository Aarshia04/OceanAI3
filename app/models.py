from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List


@dataclass
class User:
    username: str
    hashed_password: str


@dataclass
class Refinement:
    section: str
    content_before: str
    content_after: str
    feedback: str | None
    refined_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class Project:
    id: str
    name: str
    sections: List[str] = field(default_factory=list)
    section_content: Dict[str, str] = field(default_factory=dict)
    refinement_history: List[Refinement] = field(default_factory=list)
