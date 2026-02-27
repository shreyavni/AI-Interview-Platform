# 🎙️ InterviewPrep: AI-Powered Career Intelligence

InterviewPrep is a professional-grade mock interview platform that leverages **Empathic Voice AI** and **Large Language Models** to simulate real-world technical interviews. It provides a full-circle preparation suite—from resume analysis to live voice interaction.

---

## 🚀 Key Features

* **🗣️ Realistic Voice Interviews**: Powered by **Hume AI (EVC)**, featuring low-latency, empathic vocal interactions that go beyond simple text-to-speech.
* **📄 AI Resume Analysis**: Deep-scan resumes to identify skill gaps and alignment with specific Job Descriptions using **Gemini AI**.
* **🧠 Dynamic Question Generation**: Automatically generates technical questions based on JD difficulty, role requirements, and user experience level.
* **🛡️ Enterprise-Grade Security**: Integrated **Arcjet** for bot protection, rate limiting, and shield security, alongside **Clerk** for robust authentication.
* **📊 Database & Persistence**: Utilizes **PostgreSQL** with **Drizzle ORM** for type-safe data management and efficient caching.
* **🐳 Containerized Environment**: Fully **Dockerized** setup to ensure consistency across development and production environments.

---

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS + Shadcn UI |
| **AI/ML** | Hume AI (Voice), Google Gemini (LLM) |
| **Database** | PostgreSQL + Drizzle ORM |
| **Auth/Security** | Clerk Auth + Arcjet |
| **Infrastructure** | Docker, Vercel |

---

## 📦 Getting Started

### 1. Prerequisites
* Docker Desktop installed
* Node.js 20+
* API Keys for: Clerk, Hume AI, Arcjet, and Google Gemini.

### 2. Installation
```bash
# Clone the repository
git clone [https://github.com/shreyavni/AI-Interview-Platform.git](https://github.com/shreyavni/AI-Interview-Platform.git)
cd AI-Interview-Platform

# Install dependencies
npm install
```

### 3. Environment Setup
Create a .env.local file in the root directory and add your credentials:
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Clerk Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/app
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding

# Arcjet Security
ARCJET_KEY=your_arcjet_key

# Database Configuration (PostgreSQL)
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name

# Drizzle Database URL (Constructed from above)
DATABASE_URL=postgresql://your_db_user:your_db_password@your_db_host:5432/your_db_name

# Hume AI (Voice)
HUME_API_KEY=your_hume_api_key
HUME_SECRET_KEY=your_hume_secret_key
NEXT_PUBLIC_HUME_CONFID_ID=your_hume_config_id

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Project
```bash
# Start PostgreSQL via Docker
docker-compose up -d

# Run migrations to setup database schema
npx drizzle-kit push

# Start development server
npm run dev
```

---

## 🛡️ Security Guardrails

The application implements Arcjet to protect sensitive AI routes and ensure platform stability:

* **Bot Attacks**: Prevents automated scripts from consuming expensive AI credits.
* **Rate Limiting**: Custom token bucket algorithms to ensure fair usage of Gemini and Hume APIs.
* **Type Safety**: Leveraging Drizzle ORM to prevent SQL injection and ensure data integrity

---

### ***Built with ❤️ by Avni Shukla***
