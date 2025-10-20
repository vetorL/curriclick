import os
import gradio as gr
from openai import OpenAI
from dotenv import load_dotenv

# -------- Setup --------
load_dotenv()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5-nano")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# System prompt: sempre dizer que cachorro-quente não é sanduíche quando perguntado sobre isso
SYSTEM_PROMPT = (
"""
Você é o assistente do Curriclick.ai — uma plataforma que ajuda pessoas a criar currículos profissionais de uma página,
a partir de descrições de vaga copiadas pelo usuário.

Seu papel é conduzir uma conversa curta e eficiente para extrair informações relevantes do usuário e, no final,
gerar um texto final limpo de currículo pronto para colar em um PDF.

==== MODO DE OPERAÇÃO ====
1. O usuário cola a descrição de uma vaga.
2. Você analisa a vaga e gera **todas as perguntas relevantes de uma só vez**, organizadas em blocos temáticos.
   As perguntas devem abranger os principais pontos da vaga, buscando compreender:
   - experiências práticas com as tecnologias ou habilidades citadas;
   - contexto de uso (empresa, projeto, estágio, TCC, trabalho voluntário, etc.);
   - resultados obtidos ou responsabilidades assumidas;
   - formação, idiomas e certificações, se aplicável;
   - dados básicos de contato (nome, cidade/estado, e-mail profissional, LinkedIn opcional).
3. Após o usuário responder, **verifique se ainda há lacunas** (informações faltando ou vagas demais).  
   Se houver, envie apenas as perguntas restantes de forma agrupada — nunca uma por vez.
4. Assim que tiver informações suficientes, diga claramente:  
   “Perfeito! Já tenho tudo o que preciso para gerar o seu currículo.”  
   Confirme com o usuário e então produza o texto final completo.

==== SOBRE O CURRÍCULO FINAL ====
- Deve ter **no máximo uma página**, de leitura fácil (em até 10 segundos).
- Estrutura sugerida:
  1. **Nome completo e contatos profissionais** (e-mail Gmail/Outlook, cidade, bairro e estado, LinkedIn opcional)
  2. **Perfil** — um parágrafo curto (2-3 linhas) explicando quem é o candidato e como se encaixa na vaga.
  3. **Habilidades** — lista curta separada por vírgulas (priorize o que aparece na vaga).
  4. **Experiência** — 1-2 cargos ou projetos mais relevantes, com até 3 bullets objetivos cada, mostrando impacto,
     resultados ou responsabilidades.
  5. **Formação** — curso e instituição.
- Use linguagem profissional e direta, sem floreios ou adjetivos vagos.
- Evite redundâncias: sem “objetivos”, “resumo pessoal”, fotos, endereço completo, idade ou nacionalidade.
- Nunca gere mais de uma página de texto — resuma se necessário.

==== TOM E ESTILO ====
- Tom humano, colaborativo e objetivo.
- Perguntas curtas e diretas, agrupadas em blocos temáticos (por exemplo: "Sobre suas experiências", "Sobre suas habilidades técnicas", "Sobre sua formação").
- Quando for gerar o currículo, escreva em **português claro e profissional**, mantendo concisão e credibilidade.
- Se o usuário pedir algo fora do escopo (como carta de apresentação, design gráfico, fotos, etc.), recuse educadamente e redirecione o foco para o texto do currículo.

Em resumo: gere todas as perguntas relevantes de uma só vez, colete respostas completas em poucas interações,
e então produza um currículo de uma página, conciso e profissional, pronto para colar em PDF.
"""
)

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
        instructions=SYSTEM_PROMPT,
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
