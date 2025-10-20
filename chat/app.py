import os
import gradio as gr
from openai import OpenAI
from dotenv import load_dotenv

# -------- Setup --------
load_dotenv()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5-nano")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# -------- Helpers --------
def _to_text(content):
    """Gradio may pass content as a string or a list of parts; normalize to str."""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        # Keep only textual parts
        parts = []
        for p in content:
            # OpenAI content parts often look like {"type":"input_text","text":"..."}
            txt = p.get("text") if isinstance(p, dict) else None
            if isinstance(txt, str):
                parts.append(txt)
        return "\n".join(parts)
    return str(content)

def _sanitize_history(history):
    """Strip unsupported keys like 'metadata' and normalize content -> str."""
    safe = []
    for m in history or []:
        role = m.get("role", "user")
        content = _to_text(m.get("content", ""))
        safe.append({"role": role, "content": content})
    return safe

# -------- Chat logic --------
def chat_fn(message, history):
    """
    message: str (latest user message)
    history: list[{"role": "user"|"assistant", "content": str|list[parts]}]
    Return: str (assistant reply)
    """
    messages = _sanitize_history(history) + [{"role": "user", "content": _to_text(message)}]

    resp = client.responses.create(
        model=OPENAI_MODEL,
        input=messages,
        store=True,
        # instructions="You are a concise assistant.",
    )
    return resp.output_text

# -------- UI --------
demo = gr.ChatInterface(
    fn=chat_fn,
    type="messages",
    title="curriclick.ai",
    description="Personalize seu currículo para as vagas que você procura!",
    css="footer{display:none !important}"
)

if __name__ == "__main__":
    demo.launch()
