from typing import Optional


def generate_section_content(section: str, prompt: str) -> str:
    return f"Generated content for {section}: {prompt}"


def refine_section_content(existing_content: str, feedback: Optional[str] = None) -> str:
    adjustment = f" Feedback: {feedback}." if feedback else ""
    return f"Refined version of: {existing_content}.{adjustment}".strip()
