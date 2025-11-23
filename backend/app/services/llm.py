class LLMClient:
    """Simple wrapper for pluggable LLM providers."""

    def generate(self, prompt: str) -> str:
        # Placeholder implementation. Integrate OpenAI, Gemini, etc.
        return f"Generated content for: {prompt}"


llm_client = LLMClient()
