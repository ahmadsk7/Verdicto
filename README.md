
# Verdicto

Verdicto is an AI-powered litigation analytics platform that enables users to search and explore U.S. civil court data with GPT-generated case summaries, docket timelines, and legal analytics dashboards.

> 🚧 **This project is still a work in progress.** Expect ongoing updates and improvements.

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed  
  [Install Node.js with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup Instructions

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧰 Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Chart.js
- **Backend:** FastAPI
- **Database:** PostgreSQL
- **Auth & Storage:** Supabase
- **AI Integration:** OpenAI API

---

## 📁 Project Structure

```bash
/
├── frontend/             # React + Vite frontend
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── ...
├── backend/              # FastAPI backend
│   ├── app/
│   ├── routes/
│   ├── models/
│   └── ...
└── README.md
```

---

## 📊 Key Features

- 🔍 Full-text search across U.S. civil litigation cases
- 🧠 GPT-generated case summaries and legal insight extraction
- 📈 Dynamic docket timelines and data visualizations
- 👤 User account system with saved case history
- ⚙️ Automated case ingestion via scraping and cron jobs
