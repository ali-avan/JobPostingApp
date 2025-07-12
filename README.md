# Job Board Platform

A full-stack job board application built using **Flask (backend)**, **React + TypeScript (frontend)**, and **Selenium (scraper)**. It allows users to view, filter, sort, and manage job listings. Jobs can also be scraped automatically from external sources and viewed via a sleek frontend interface.

---

## 📹 Video Demo  
[Watch Demo Video](https://www.loom.com/share/cf7c4020e0de4477ae025018aa5dd688?sid=b943e602-37b1-49f3-8077-d894a5a424ee)

---

##  Features

- Add, edit, and delete job postings  
- Filter jobs by title, company, location, type, and tags  
- Keyword-based global search (`q` parameter)  
- Sort by posting date (newest/oldest)  
- Pagination support  
- Selenium scraper integration to fetch external jobs  

---

## Project Structure

project-root/
├── backend/
│ ├── app.py # Main Flask app
│ ├── models/
│ │ └── job.py # SQLAlchemy Job model
│ ├── routes/
│ │ └── job_routes.py # Job API routes using Blueprints
│ ├── db.py # Database setup
│ ├── config.py # DB config
│ └── requirements.txt # Python dependencies
├── Scraper/
│ └── scrape.py # Selenium scraper script
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/ui/
│ │ │ ├── DeleteDialog.tsx
│ │ │ ├── FilterSort.tsx
│ │ │ ├── JobCard.tsx
│ │ │ ├── JobForm.tsx
│ │ │ ├── modeToggle.tsx
│ │ │ ├── Spinner.tsx
│ │ │ ├── PaginationControls.tsx
│ │ │ └── TopHeader.tsx
│ │ │ ├── theme-provider.tsx
│ │ ├── hooks/
│ │ │ ├── use-toast.ts
│ │ │ ├── useAddFormJob.ts
│ │ │ ├── useEditFormJob.ts
│ │ │ └── useHomePage.ts
│ │ ├── lib/
│ │ │ └── utils.ts
│ │ ├── pages/
│ │ │ ├── AddJob.tsx
│ │ │ ├── EditJob.tsx
│ │ │ ├── Landing.tsx
│ │ │ └── Home.tsx
│ │ ├── api.ts # API functions
│ │ ├── index.tsx # Entry point
│ │ └── App.tsx # Main App logic
│ └── App.css # Global styles
└── README.md

##  Setup Instructions

### Prerequisites

- Python >= 3.9  
- Node.js >= 16  
- Chrome Browser + ChromeDriver  

---
Technology Decisions
Flask with Blueprints for modular API design

SQLAlchemy ORM for database access

Selenium for dynamic scraping

React + TypeScript with clean component architecture

Tailwind CSS + ShadCN UI components

 Assumptions & Trade-Offs
All scraped jobs are assumed Full-Time unless explicitly stated

No user authentication (out of scope for this project)

10 jobs per page for pagination

Minimal backend validation (trusted use assumed)

 Notes & Comments
Frontend (React)
Clean component structure: JobCard, FilterSort, PaginationControls, etc.

Filters, search, and sort use useSearchParams for URL-based state

Global search (q) implemented via text matching

Axios (api.ts) handles API calls to backend

Custom hooks (useHomePage) and toasts improve code clarity and UX

Backend (Flask)
Organized with Blueprints in routes/job_routes.py

Uses SQLAlchemy for query filtering, sorting, and pagination (limit, offset)

Graceful error handling with try/except + clear JSON responses

flask-cors enables CORS for frontend-backend communication

Scraper (Selenium)
Extracts job info from actuarylist.com

Infers job type from tag keywords

Skips duplicates via job_exists() check

Uses app_context() to insert jobs directly into database

Database (SQLAlchemy)
Job model stores job fields: title, company, location, posting_date, job_type, tags

tags stored as comma-separated strings but converted to lists via to_dict()

posting_date defaults to date.today()

 To-Do / Improvements
Add authentication and user roles

Enable scraper to run via Flask route

Add test coverage for backend API

 License
This project is for educational/demo purposes only.
