## 🚀 AI- Powered JOB TRACKER

React · Tailwind CSS · Node.js · Express · PostgreSQL · SQLite · Google Gemini API · OAuth 2.0 · Google Cloud Run · Nginx · CI/CD

A production-ready, full-stack job tracking platform that leverages AI to automate resume analysis, job matching, and application management. The system is designed using a scalable architecture and deployed on cloud infrastructure with secure authentication and automated workflows.

## ✨ Key Highlights


🤖 Integrated AI-powered resume analysis and job matching using Google Gemini API
📄 Automated job description parsing and skill extraction using NLP workflows
🔐 Implemented secure authentication with OAuth 2.0 (Google Login) and JWT
☁️ Deployed on Google Cloud Run with Nginx reverse proxy for traffic management
🔄 Built CI/CD pipeline using GitHub Actions for zero-downtime deployments
📧 Enabled email automation for notifications and updates
⚡ Designed for scalability, performance, and real-world production use


## 🏗️ Project Structure


AI-Job-Tracker/
├── frontend/              # React.js frontend (UI layer)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/               # Node.js + Express backend (APIs)
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   └── server.ts
├── database/              # Database configuration & schema
│   ├── schema.sql
│   └── config files
├── nginx/                 # Nginx configuration for reverse proxy
│   └── nginx.conf
├── .github/workflows/     # CI/CD pipelines (GitHub Actions)
└── README.md

## 🛠️ Technology Stack
🌐 Frontend
React (with TypeScript)
Vite
Tailwind CSS
⚙️ Backend
Node.js
Express.js
TypeScript

Authentication:

JSON Web Tokens (JWT)
OAuth 2.0 (Google Social Login)
🗄️ Database
PostgreSQL
SQLite (for lightweight/local usage)
🤖 AI Integration
Google Gemini API
Prompt Engineering for NLP tasks
☁️ Infrastructure & DevOps
Google Cloud Run
Nginx (Reverse Proxy)
GitHub Actions (CI/CD)
⚙️ Prerequisites

Ensure the following are installed:

Node.js & npm
PostgreSQL
Google Cloud SDK (optional for deployment)
Git

## 🚀 Setup & Installation

1️⃣ Clone the Repository
git clone https://github.com/a-tushar-a/AI-Job-Tracker.git
cd AI-Job-Tracker


2️⃣ Backend Setup
cd backend
npm install
npm run dev
Backend runs on: http://localhost:3000


3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

4️⃣ Database Setup
Create a PostgreSQL database
Configure environment variables in .env file:
DB_URL=your_database_url
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
GEMINI_API_KEY=your_api_key


5️⃣ Deployment (Cloud Run)
Build and deploy using Google Cloud Run
Configure Nginx for reverse proxy
Set up GitHub Actions for CI/CD


## 💡 How It Works
User logs in via Google OAuth
Uploads resume or inputs profile details
AI analyzes resume and extracts key skills
System parses job descriptions and matches relevant roles
Dashboard displays matched jobs and application tracking
Notifications and updates are sent via email automation


## 📌 Key Strengths
⚡ AI-driven automation reduces manual effort
🔐 Secure authentication & protected APIs
☁️ Cloud-native deployment with scalability
🔄 Continuous deployment with CI/CD
📊 Real-world use case with production-ready design



## The **AI Powered Job Tracker** is built using a modern, full-stack TypeScript architecture.

## Frontend (Client-Side)
- **Framework:** [React 19](https://react.dev/) (with TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations:** [Motion](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Markdown:** `react-markdown`

## Backend (Server-Side)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Server Framework:** [Express](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (executed via `tsx`)
- **Authentication:** 
  - [JSON Web Tokens (JWT)](https://jwt.io/)
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  - **OAuth 2.0:** Google Social Login

## Database
- **Engine:** [SQLite](https://sqlite.org/)
- **Driver:** [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3)

## AI Integration
- **Model:** [Google Gemini 3.1 Flash](https://ai.google.dev/gemini-api/docs/models/gemini)
- **SDK:** [`@google/genai`](https://www.npmjs.com/package/@google/genai)

## Infrastructure
- **Environment:** [Google Cloud Run](https://cloud.google.com/run)
- **Reverse Proxy:** Nginx (manages external traffic to port 3000)

 
👨‍💻 Author

Tushar  

Full Stack Developer | Java | AI
📧 tusharkumar22mohan@gmail.com
🔗 LinkedIn: https://linkedin.com/in/zz-tushar-az
