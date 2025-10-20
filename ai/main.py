import gradio as gr
from openai import OpenAI
import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field

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

class JobExtraction(BaseModel):
    role: str = Field(..., description="Job title or position name.")
    must_have: list[str] = Field(..., description="Top required skills or qualifications.")
    nice_to_have: list[str] = Field(default_factory=list, description="Optional but desirable skills.")
    responsibilities: str = Field(..., description="Key responsibilities of the role.")


def extract_job_info(user_prompt):

    system_prompt = (
        "Extract the role and skills from this job description. "
        "Return ONLY JSON that matches the schema."
        "\n\n<your job text here>"
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    completion = client.chat.completions.parse(
        model=OPENAI_MODEL,
        messages=messages,
        response_format=JobExtraction,
    )

    return completion.choices[0].message.content


demo = gr.Interface(
    fn=extract_job_info,
    inputs=["text"],
    outputs=["text"],
)

demo.launch()
