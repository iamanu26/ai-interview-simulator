from fastapi import FastAPI
from interview_agent import InterviewAgent
from voice_routes import router as voice_router



app = FastAPI()

app.include_router(voice_router)

agent = InterviewAgent(
    company="Product Based",
    role="Software Engineer",
    level="Intermediate"
)

@app.post("/interview/hr")
def hr_interview(answer: str):
    response = agent.hr_interviewer(answer)
    return {"question": response}

@app.post("/interview/tech")
def tech_interview(answer: str):
    response = agent.tech_interviewer(answer)
    return {"question": response}
