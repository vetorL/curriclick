import gradio as gr
from openai import OpenAI
import os
from dotenv import load_dotenv

# --------------------------
# Setup
# --------------------------

load_dotenv()

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5-nano")

if not OPENAI_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set in the environment")

client = OpenAI(api_key=OPENAI_KEY)


# --------------------------
# Gradio
# --------------------------

def greet(user_prompt):

    system_prompt = ""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    resp = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=messages,
    )

    content = resp.choices[0].message.content

    return content

demo = gr.Interface(
    fn=greet,
    inputs=["text"],
    outputs=["text"],
)

demo.launch()
