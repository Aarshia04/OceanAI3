from __future__ import annotations

from typing import Dict
import uuid

from app.models import Project, User


class InMemoryStore:
    def __init__(self) -> None:
        self.users: Dict[str, User] = {}
        self.projects: Dict[str, Project] = {}

    def create_user(self, username: str, hashed_password: str) -> User:
        user = User(username=username, hashed_password=hashed_password)
        self.users[username] = user
        return user

    def get_user(self, username: str) -> User | None:
        return self.users.get(username)

    def create_project(self, name: str) -> Project:
        project_id = str(uuid.uuid4())
        project = Project(id=project_id, name=name)
        self.projects[project_id] = project
        return project

    def get_project(self, project_id: str) -> Project | None:
        return self.projects.get(project_id)

    def save_project(self, project: Project) -> Project:
        self.projects[project.id] = project
        return project


store = InMemoryStore()
