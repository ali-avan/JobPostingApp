# **Job Board Platform**

A full-stack job board application built using **Flask** (backend), **React + TypeScript** (frontend), and **Selenium** (scraper).
It allows users to view, filter, sort, and manage job listings, including automatically scraped jobs from external sites.

 **Demo Video:**
 [Watch the Demo](https://www.loom.com/share/cf7c4020e0de4477ae025018aa5dd688?sid=bd663f9e-949b-45dc-ac2d-4ec783eb389c)

---

## ** Features**

* Add, edit, and delete job postings
* Filter by title, company, location, job type, and tags
* Keyword-based global search (`q` parameter)
* Sort jobs by posting date (newest/oldest)
* Pagination support (10 items per page)
* Selenium-based job scraping from external site
* Clean, responsive frontend UI

---

## ** Tech Stack**

### **Backend**

* **Flask** (modular API using Blueprints)
* **SQLAlchemy** ORM
* **Flask-CORS** for cross-origin requests

### **Frontend**

* **React + TypeScript**
* **Vite** for fast builds
* **Tailwind CSS + ShadCN UI**
* **Axios** for API communication

### **Scraper**

* **Selenium** (uses ChromeDriver)
* Scrapes jobs from [actuarylist.com](https://www.actuarylist.com)

---

## ** Setup Instructions**

### ** Prerequisites**

* Python ≥ 3.9
* Node.js ≥ 16
* Chrome + ChromeDriver (installed and added to PATH)

---

### **⚙ Backend (Flask)**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

1. Update `config.py` with your **database URI**.
2. Initialize the database:

```python
from db import db
from app import app

with app.app_context():
    db.create_all()
```

3. Start the Flask server:

```bash
python app.py
```

---

### ** Frontend (React + Vite + TypeScript)**

```bash
cd frontend
npm install
npm run dev
```

---

### ** Scraper (Selenium)**

```bash
cd Scraper
pip install -r ../backend/requirements.txt
python scrape.py
```

>  Ensure ChromeDriver is properly installed and added to your PATH.

---

## ** Assumptions & Trade-Offs**

* Scraped jobs are assumed **Full-Time** unless stated
* No authentication or user roles (for demo simplicity)
* Pagination is fixed to 10 jobs per page
* Backend validation is minimal (trusted usage assumed)

---

## ** Project Structure**

### **Frontend**

* Component-based structure: `JobCard`, `FilterSort`, `PaginationControls`, etc.
* Uses `useSearchParams` for syncing filters/sorting via URL
* `api.ts` handles all backend communication
* Custom hooks like `useHomePage` separate logic cleanly
* Toasts provide real-time feedback on actions

### **Backend**

* Modular routes via **Blueprints** (e.g., `job_routes.py`)
* SQLAlchemy supports filtering, sorting, and pagination
* Errors handled via `try/except` with JSON responses

### **Scraper**

* Scrapes job listings from **actuarylist.com**
* Extracts title, company, location, tags, and type
* Avoids duplicates using `job_exists()`
* Uses `Flask app_context()` to update DB externally

### **Database (SQLAlchemy)**

* Job model fields:

  * `title`, `company`, `location`, `posting_date`, `job_type`, `tags`
* `tags` stored as comma-separated strings in DB
* `posting_date` defaults to current date
* `to_dict()` used for JSON serialization

---

## ** Future Improvements**

* Add **authentication** and **role-based access control**
* Enable scraper to run via Flask route (e.g., `/python scrape_jobs.py`)
* Add **unit and integration tests** for backend routes

---

## ** License**

This project is intended for **educational/demo purposes only**.

---
