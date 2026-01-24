from fastapi import FastAPI, Depends, HTTPException

from interview_agent import InterviewAgent
from voice_routes import router as voice_router

from sqlalchemy.orm import Session
from database import Base, engine
from models import User
from auth import (
    get_db,
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)


app = FastAPI()
Base.metadata.create_all(bind=engine)

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


# Authentication routes

@app.post("/auth/register")
def register(name: str, email: str, password: str, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        name=name,
        email=email,
        password=hash_password(password)
    )
    db.add(user)
    db.commit()
    return {"message": "User registered successfully"}


@app.post("/auth/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/auth/me")
def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }
