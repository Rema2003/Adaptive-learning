from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import os

try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "mock-key"))
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False

app = FastAPI(title="Adaptive AI Learning Engine")

class ProgressLog(BaseModel):
    user_id: str
    topic: str
    difficulty: float
    is_correct: bool
    time_spent_seconds: float

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-engine", "llm_enabled": HAS_OPENAI}

@app.post("/analyze_progress")
def analyze_and_recommend(log: ProgressLog):
    # 1. Update difficulty using basic adaptive logic (e.g., Elo rating system or IRT)
    adjustment = 0.1 if log.time_spent_seconds < 60 else 0.05
    new_difficulty = log.difficulty + adjustment if log.is_correct else log.difficulty - adjustment
    new_difficulty = max(0.0, min(1.0, new_difficulty))

    # 2. Generate customized AI feedback
    feedback = ""

    if HAS_OPENAI and os.getenv("OPENAI_API_KEY"):
        try:
            prompt = f"A student answered a {log.topic} question of difficulty {log.difficulty}. They got it {'right' if log.is_correct else 'wrong'} in {log.time_spent_seconds} seconds. Provide a brief encouraging 2-sentence feedback."
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "system", "content": "You are an adaptive AI tutor. Speak directly to the student."},
                          {"role": "user", "content": prompt}]
            )
            feedback = response.choices[0].message.content
        except Exception as e:
            feedback = f"Error generating LLM response: {str(e)}"
    else:
        # Fallback Mock logic if OpenAI API key is not provided
        if log.is_correct:
             feedback = f"Excellent work on {log.topic}! You answered quickly. Let's increase the difficulty slightly to keep you challenged."
        else:
             feedback = f"Looks like {log.topic} was a bit tough. No worries, I'll generate a visual breakdown of the core concept before we move on."

    return {
        "updated_difficulty": round(new_difficulty, 2),
        "ai_generated_feedback": feedback,
        "next_recommended_topic": log.topic if not log.is_correct else "Advanced " + log.topic
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
