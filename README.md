# Job Board Platform

A full-stack job board application built using **Flask (backend)**, **React + TypeScript (frontend)**, and **Selenium (scraper)**. It allows users to view, filter, sort, and manage job listings. Jobs can also be scraped automatically from external sources and viewed via a sleek frontend interface.

---

##  Video Demo  
[ Watch Demo Video](https://www.loom.com/share/cf7c4020e0de4477ae025018aa5dd688?sid=b943e602-37b1-49f3-8077-d894a5a424ee)

---

##  Features

- Add, edit, and delete job postings  
- Filter jobs by title, company, location, type, and tags  
- Keyword-based global search (`q` parameter)  
- Sort by posting date (newest/oldest)  
- Pagination support  
- Selenium scraper integration to fetch jobs from external site  

---

##  Setup Instructions

### Prerequisites

- Python >= 3.9  
- Node.js >= 16  
- Chrome Browser + ChromeDriver  

---

###  Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
Update config.py with your database URI

Initialize the database:

python
Copy code
from db import db
from app import app
with app.app_context():
    db.create_all()
Run the server:

bash
Copy code
python app.py
 Frontend (React + Vite + TypeScript)
bash
Copy code
cd frontend
npm install
npm run dev
 Scraper (Selenium)
bash
Copy code
cd Scraper
pip install -r ../backend/requirements.txt
python scrape.py
Ensure ChromeDriver is correctly installed and added to your PATH.

 Technology Stack
Flask with Blueprints for modular API routing

SQLAlchemy ORM for interacting with the database

React + TypeScript for frontend development

Selenium for scraping job listings dynamically

Tailwind CSS + ShadCN UI for a clean UI framework

 Assumptions & Trade-Offs
Scraped jobs are considered Full-Time unless explicitly tagged

No authentication or user roles (intentionally excluded)

Pagination limited to 10 items per page

Backend validation is minimal, assuming trusted usage

 Notes & Comments
 Frontend (React)
Component-based structure with reusable elements (JobCard, FilterSort, PaginationControls, etc.)

Uses useSearchParams for syncing filters, sorting, and pagination via URL

Global search (q) implemented using string matching

axios in api.ts handles all communication with backend

Custom hooks (useHomePage, etc.) manage logic cleanly

Toasts provide real-time feedback on CRUD actions

 Backend (Flask)
API logic organized using Blueprints (job_routes.py)

SQLAlchemy handles filtering, sorting, and pagination via limit and offset

CORS handled using flask-cors to enable frontend-backend integration

Errors are caught using try/except blocks with informative JSON responses

 Scraper (Selenium)
Scrapes data from actuarylist.com

Extracts job title, company, location, tags, and infers job type

Avoids duplicates using job_exists()

Uses Flask app_context() to interact with the DB from outside the server runtime

 Database (SQLAlchemy)
Job model includes fields: title, company, location, posting_date, job_type, tags

tags stored as comma-separated strings in DB, converted to lists in API response

posting_date defaults to current date using date.today()

to_dict() method used to serialize model data to JSON

 To-Do / Future Improvements 
Add authentication and role-based access control

Enable scraper to run via Flask route (e.g., /run-scraper)

Add unit and integration tests for backend API

 License
This project is for educational/demo purposes only.
