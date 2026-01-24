from fastapi import APIRouter
from interview_agent import InterviewAgent

router = APIRouter()

agent = InterviewAgent(
    company="Product Based",
    role="Software Engineer",
    level="Intermediate"
)

@router.post("/interview/voice/tech")
async def voice_tech_interview(text: str):
    ai_text = agent.tech_interviewer(text)
    return {"reply": ai_text}
