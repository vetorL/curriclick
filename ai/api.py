from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List
import json, os, re
from dotenv import load_dotenv
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam

# --------------------------
# Setup
# --------------------------
load_dotenv()

app = FastAPI(title="Curriclick.ai MVP API", version="0.1.0")

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5-nano")

if not OPENAI_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set in the environment")

client = OpenAI(api_key=OPENAI_KEY)

# --------------------------
# Core GPT-5-nano parser
# --------------------------
def parse_job_with_llm(job_text: str) -> Dict[str, Any]:
    system_prompt = (
        "You are a concise resume-building assistant.\n"
        "Extract key role info and required skills.\n"
        "Output strict JSON only with keys: "
        "role, must_have (top 6), nice_to_have (top 4), responsibilities."
    )

    messages: List[ChatCompletionMessageParam] = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": job_text[:4000] if job_text else ""},
    ]

    resp = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=messages,
        response_format={"type": "json_object"},
        max_completion_tokens=220,
    )

    content = resp.choices[0].message.content

    if content is None:
        raise HTTPException(status_code=502, detail="Model returned empty content")

    # strip possible code fences just in case
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", content.strip(), flags=re.S)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=502, detail=f"Invalid JSON from model: {e}")

# --------------------------
# Routes
# --------------------------
class AnalyzeReq(BaseModel):
    profile_id: str
    job_text: str

@app.post("/analyze_job")
def analyze_job(req: AnalyzeReq) -> Dict[str, Any]:
    return parse_job_with_llm(req.job_text)

@app.get("/healthz")
def healthz():
    return {"ok": True, "using_openai": True, "model": OPENAI_MODEL}
