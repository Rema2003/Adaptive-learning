# Adaptive AI Learning Platform 🧠

A full-stack, AI-powered adaptive educational platform that dynamically adjusts lesson difficulty based on student performance using advanced Machine Learning microservices.

## 🌟 Features
- **Adaptive Difficulty:** Automatically scales difficulty using real-time telemetry (time spent, correctness) evaluated by a custom Python ML engine.
- **AI Tutor Feedback:** Connects to OpenAI LLMs to generate personalized instructional feedback when students struggle.
- **Microservices Architecture:** Independently scalable Frontend (Next.js), Core API (Node.js), and AI Engine (Python).
- **Modern UI/UX:** Built with Tailwind CSS v4, featuring immersive glassmorphism, fluid micro-animations, and full dark mode support.

## 🛠️ Tech Stack
- **Frontend:** React, Next.js 15, Tailwind CSS
- **Backend API:** Node.js, Express, MongoDB (Mongoose)
- **AI Microservice:** Python, FastAPI, OpenAI SDK, Pydantic

## 🚀 Getting Started

### 1. Start the Python AI Engine (Port 8000)
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn motor pydantic openai
uvicorn main:app --reload
```

### 2. Start the Node.js API (Port 5000)
```bash
cd api
npm install
node server.js
```

### 3. Start the Next.js Frontend (Port 3000/3001)
```bash
cd frontend
npm install
npm run dev
```

## 📸 Demo
*(Add your stunning screenshots or GIFs here showing the dashboard and the interactive lesson module in action!)*

---
**Architecture Overview:** The React client logs student interactions and POSTs them to the Express API. The API forwards this telemetry to the Python FastAPI microservice, which applies Item Response Theory mock logic to calculate a new difficulty and returns context-aware AI tutor guidance back to the user interface in real-time.
