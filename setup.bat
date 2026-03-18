@echo off
echo Setting up Next.js
call npx -y create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes

echo Setting up API
if not exist api mkdir api
cd api
call npm init -y
call npm install express mongoose cors dotenv
cd ..

echo Setting up ML Service
if not exist ml-service mkdir ml-service
cd ml-service
python -m venv venv
call .\venv\Scripts\python.exe -m pip install fastapi uvicorn motor pydantic
cd ..
