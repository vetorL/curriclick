import os
import json
import sqlite3
from typing import Any, Dict, List, Optional

from agents import Agent, Runner, function_tool, RunContextWrapper, RunConfig

DB_PATH = os.getenv("INTERVIEW_AGENT_DB", "interview_agent.db")

# ---------------------------
# SQLite: ultra-simple schema
# ---------------------------
# - users(email PK, phone, state, city, neighborhood)
# - profile(email FK, education_json, certifications_json, languages_json, experience_json)
# - skills(email FK, skill, details_json)
#
# "details_json" is a JSON with fields you decide to store, e.g.:
#   {"experience":"2 years building internal dashboards", "level":"Advanced"}
#
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            phone TEXT,
            state TEXT,
            city TEXT,
            neighborhood TEXT
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS profile (
            email TEXT PRIMARY KEY,
            education_json TEXT DEFAULT '[]',
            certifications_json TEXT DEFAULT '[]',
            languages_json TEXT DEFAULT '[]',
            experience_json TEXT DEFAULT '[]',
            FOREIGN KEY(email) REFERENCES users(email)
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS skills (
            email TEXT,
            skill TEXT,
            details_json TEXT,
            PRIMARY KEY (email, skill),
            FOREIGN KEY(email) REFERENCES users(email)
        )
    """)
    conn.commit()
    conn.close()

# ---------------------------
# DB helpers
# ---------------------------
def _get_conn():
    return sqlite3.connect(DB_PATH)

def get_user_core(email: str) -> Dict[str, Optional[str]]:
    conn = _get_conn()
    cur = conn.cursor()
    cur.execute("SELECT email, phone, state, city, neighborhood FROM users WHERE email = ?", (email,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return {"email": email, "phone": None, "state": None, "city": None, "neighborhood": None}
    return {"email": row[0], "phone": row[1], "state": row[2], "city": row[3], "neighborhood": row[4]}

def get_user_profile(email: str) -> Dict[str, Any]:
    conn = _get_conn()
    cur = conn.cursor()
    cur.execute("SELECT education_json, certifications_json, languages_json, experience_json FROM profile WHERE email = ?", (email,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return {"education": [], "certifications": [], "languages": [], "experience": []}
    return {
        "education": json.loads(row[0] or "[]"),
        "certifications": json.loads(row[1] or "[]"),
        "languages": json.loads(row[2] or "[]"),
        "experience": json.loads(row[3] or "[]"),
    }

def get_user_skills(email: str) -> Dict[str, Dict[str, Any]]:
    conn = _get_conn()
    cur = conn.cursor()
    cur.execute("SELECT skill, details_json FROM skills WHERE email = ?", (email,))
    rows = cur.fetchall()
    conn.close()
    return {skill: json.loads(details_json or "{}") for (skill, details_json) in rows}

def upsert_user_core(email: str, phone: Optional[str], state: Optional[str], city: Optional[str], neighborhood: Optional[str]):
    conn = _get_conn()
    cur = conn.cursor()
    cur.execute("INSERT OR IGNORE INTO users(email, phone, state, city, neighborhood) VALUES (?, ?, ?, ?, ?)",
                (email, phone, state, city, neighborhood))
    cur.execute("UPDATE users SET phone=COALESCE(?, phone), state=COALESCE(?, state), city=COALESCE(?, city), neighborhood=COALESCE(?, neighborhood) WHERE email=?",
                (phone, state, city, neighborhood, email))
    conn.commit()
    conn.close()

def upsert_user_profile(email: str, education: Optional[List[Dict]]=None, certifications: Optional[List[Dict]]=None,
                        languages: Optional[List[Dict]]=None, experience: Optional[List[Dict]]=None):
    conn = _get_conn()
    cur = conn.cursor()
    cur.execute("INSERT OR IGNORE INTO profile(email) VALUES (?)", (email,))
    if education is not None:
        cur.execute("UPDATE profile SET education_json=? WHERE email=?", (json.dumps(education), email))
    if certifications is not None:
        cur.execute("UPDATE profile SET certifications_json=? WHERE email=?", (json.dumps(certifications), email))
    if languages is not None:
        cur.execute("UPDATE profile SET languages_json=? WHERE email=?", (json.dumps(languages), email))
    if experience is not None:
        cur.execute("UPDATE profile SET experience_json=? WHERE email=?", (json.dumps(experience), email))
    conn.commit()
    conn.close()

def upsert_user_skill(email: str, skill: str, details: Dict[str, Any]):
    conn = _get_conn()
    cur = conn.cursor()
    cur.execute("INSERT OR REPLACE INTO skills(email, skill, details_json) VALUES (?, ?, ?)",
                (email, skill, json.dumps(details)))
    conn.commit()
    conn.close()

# ---------------------------
# Tools exposed to the Agent
# ---------------------------

@function_tool
def fetch_profile(ctx: RunContextWrapper[Any], email: str, skills: List[str]) -> Dict[str, Any]:
    """
    Return known user info and which skills are missing.

    Args:
        email: The user's email (primary key).
        skills: The list of skills from the job JSON (must_have + nice_to_have).
    """
    core = get_user_core(email)
    profile = get_user_profile(email)
    known_skills = get_user_skills(email)
    missing_skills = [s for s in skills if s not in known_skills]

    # Which core/profile attributes are missing?
    missing_profile = {
        "phone": core["phone"] is None,
        "state": core["state"] is None,
        "city": core["city"] is None,
        "neighborhood": core["neighborhood"] is None,
        "education": len(profile["education"]) == 0,
        "certifications": len(profile["certifications"]) == 0,
        "languages": len(profile["languages"]) == 0,
        "experience": len(profile["experience"]) == 0,
    }

    return {
        "core": core,
        "profile": profile,
        "known_skills": known_skills,
        "missing_skills": missing_skills,
        "missing_profile": missing_profile,
    }

@function_tool
def save_profile_facts(
    ctx: RunContextWrapper[Any],
    email: str,
    phone: Optional[str] = None,
    state: Optional[str] = None,
    city: Optional[str] = None,
    neighborhood: Optional[str] = None,
    education: Optional[List[Dict[str, Any]]] = None,
    certifications: Optional[List[Dict[str, Any]]] = None,
    languages: Optional[List[Dict[str, Any]]] = None,
    experience: Optional[List[Dict[str, Any]]] = None,
) -> str:
    """
    Upsert user core/profile facts.

    Args mirror the stored fields. Any omitted/None field is ignored.
    """
    upsert_user_core(email, phone, state, city, neighborhood)
    upsert_user_profile(email, education, certifications, languages, experience)
    return "User profile facts saved."

@function_tool
def save_skill_details(ctx: RunContextWrapper[Any], email: str, skill: str, experience_text: str, level: Optional[str] = None) -> str:
    """
    Upsert a single skill for the user.

    Args:
        email: User email.
        skill: Skill name (e.g., 'React').
        experience_text: Short description of hands-on experience.
        level: Optional level label (Beginner/Intermediate/Advanced/Expert).
    """
    upsert_user_skill(email, skill, {"experience": experience_text, "level": level})
    return f"Saved skill {skill}."

# ---------------------------
# The Interview Agent
# ---------------------------
INSTRUCTIONS = """You are the Interview Agent.

Goals:
1) Read a job JSON with fields: role, must_have[], nice_to_have[], responsibilities.
2) Fetch known user data via tools, using the provided email.
3) If any skills or profile attributes are missing, ask concise, formal questions for ALL missing items in one single message. Do not repeat questions already answered in DB.
   - For skills: ask one question per missing skill, e.g., "What is your experience with Docker?" Optionally ask for a level (Beginner/Intermediate/Advanced/Expert).
   - For profile: ask for only the missing attributes among: phone, state, city, neighborhood, education, certifications, languages, experience.
4) After the user answers, call the save tools to persist all new facts and skills.
5) Finally, produce a clear "Fit Summary" that maps the user's known capabilities to the job's must_have and nice_to_have, plus a short narrative summary (3–5 lines). Keep tone formal and concise.
6) The final output should be suitable as input for a downstream CVBuilderAgent.

Output policy:
- If information is missing, output ONLY the consolidated questions block.
- If nothing is missing (or after saving new info), output the Fit Summary only.

IMPORTANT:
- Always call fetch_profile first.
- Never ask for data that is already stored.
- Keep questions minimal and formal.
- Never include implementation details about the tools.
"""

agent = Agent(
    name="InterviewAgent",
    instructions=INSTRUCTIONS,
    tools=[fetch_profile, save_profile_facts, save_skill_details],
    # You can override the model globally when running with Runner if you like.
)

# ---------------------------
# Simple runner helpers
# ---------------------------
def build_first_turn_prompt(email: str, job_json: Dict[str, Any]) -> str:
    """
    Builds the first instruction to the agent.
    """
    must = job_json.get("must_have", [])
    nice = job_json.get("nice_to_have", [])
    skills = must + nice

    return (
        "You will receive a job JSON and a user email.\n"
        f"User email: {email}\n"
        f"Job JSON:\n{json.dumps(job_json, ensure_ascii=False, indent=2)}\n\n"
        f"Combined skills list for fetch_profile: {json.dumps(skills, ensure_ascii=False)}\n"
        "Proceed."
    )

def run_interview(email: str, job_json: Dict[str, Any], model: Optional[str] = None):
    prompt = build_first_turn_prompt(email, job_json)
    run_config = RunConfig(model=model) if model else None
    result = Runner.run_sync(agent, prompt, run_config=run_config)
    return result.final_output

# ---------------------------
# Example usage (CLI)
# ---------------------------
if __name__ == "__main__":
    init_db()

    # --- 1) First turn: the agent inspects DB and (if needed) asks all missing questions
    job = {
        "role": "Desenvolvedor Full Stack",
        "must_have": [
            "React",
            "Angular",
            "Node.js",
            "Typescript",
            "PHP",
            "AWS",
            "Metodologias ágeis (Scrum/Kanban)",
            "Inglês Intermediário"
        ],
        "nice_to_have": ["Docker", "Kubernetes", "TDD", "BDD", "CI/CD"],
        "responsibilities": "Desenvolvimento e manutenção de aplicações web; Integração de sistemas; Automação de testes; Back-End e Front-End."
    }

    email = os.getenv("DEMO_USER_EMAIL", "candidate@example.com")
    print("\n=== TURN 1: Inspect & Ask Missing ===")
    out1 = run_interview(email, job, model=os.getenv("OPENAI_MODEL", "gpt-5-nano"))
    print(out1)

    # --- 2) If the output was questions, paste your answers in a compact JSON-like form,
    # and run another turn where the agent calls save_* tools, then returns the Fit Summary.
    # For a barebones demo, you can manually call the agent again, e.g.:
    #
    # user_answers = '''
    # Phone: +55 11 99999-0000
    # City/State: São Paulo, SP (Vila Mariana)
    # Education: Bacharel em Sistemas de Informação (USP, 2026)
    # Languages: Português (Nativo), Inglês (Intermediário B2)
    # Certifications: AWS Certified Cloud Practitioner (2024)
    # Experience: 2 anos em Full Stack (React/Node/Typescript), 1 ano com AWS
    # Docker: 1 ano, nível Intermediário
    # CI/CD: 1 ano, nível Intermediário (GitHub Actions)
    # Kubernetes: Sem experiência prática
    # '''
    #
    # print("\n=== TURN 2: Save & Fit Summary ===")
    # out2 = Runner.run_sync(agent, user_answers, run_config={"model": os.getenv("OPENAI_MODEL", "gpt-5-nano")}).final_output
    # print(out2)
