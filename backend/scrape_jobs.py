import time
import os
from datetime import date
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

from app import create_app
from db import db
from models.job import Job

# WebDriver manager environment
os.environ['WDM_LOCAL'] = '1'
os.environ['WDM_LOG_LEVEL'] = '0'
os.environ['WDM_CHROME_DRIVER_VERSION'] = '138.0.7204.97'

def init_driver():
    options = Options()
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920x1080")
    chromedriver_path = r"C:\Users\Ali Awan\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe"
    return webdriver.Chrome(service=Service(chromedriver_path), options=options)

def job_exists(title, company):
    return Job.query.filter_by(title=title, company=company).first() is not None

def insert_job(job_data):
    if not job_exists(job_data["title"], job_data["company"]):
        job = Job(**job_data)
        db.session.add(job)
        db.session.commit()
        print(f" Inserted: {job.title}")
    else:
        print(f" Duplicate skipped: {job_data['title']} at {job_data['company']}")

def extract_company_and_location(driver):
    company = "Unknown"
    location = "Unknown"

    try:
        company_elem = driver.find_element(By.CSS_SELECTOR, 'p[class^="Job_job-header__company"]')
        company = company_elem.text.strip()
    except Exception as e:
        print(" Couldn't extract company:", e)

    try:
        location_elems = driver.find_elements(By.CSS_SELECTOR, 'a[class^="Job_job-header__location"]')
        locations = [loc.text.strip() for loc in location_elems if loc.text.strip()]
        if locations:
            location = ", ".join(locations)
    except Exception as e:
        print(" Couldn't extract location(s):", e)

    return company, location

def scrape_jobs():
    print(" Starting job scrape...")
    driver = init_driver()
    driver.get("https://www.actuarylist.com")

    try:
        WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a[class^='Job_job-page-link']"))
        )
        print(" Job cards loaded!")
    except:
        print(" Timed out waiting for job cards.")
        driver.quit()
        return

    for _ in range(3):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

    job_cards = driver.find_elements(By.CSS_SELECTOR, "a[class^='Job_job-page-link']")
    print(f" Found {len(job_cards)} job links")

    for job in job_cards:
        try:
            full_url = job.get_attribute("href")
            driver.execute_script("window.open(arguments[0]);", full_url)
            driver.switch_to.window(driver.window_handles[-1])

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "h1"))
            )

            job_title = driver.find_element(By.TAG_NAME, "h1").text.strip()
            company, location = extract_company_and_location(driver)

            tags = []
            try:
                tag_elements = driver.find_elements(By.CSS_SELECTOR, "div[class*=Tag_tag] span")
                tags = [tag.text.strip() for tag in tag_elements if tag.text.strip()]
            except:
                tags = []

            job_type = "Full-Time"
            for tag in tags:
                if "intern" in tag.lower():
                    job_type = "Intern"
                elif "part-time" in tag.lower():
                    job_type = "Part-Time"

            job_data = {
                "title": job_title,
                "company": company,
                "location": location,
                "posting_date": date.today(),
                "job_type": job_type,
                "tags": ", ".join(tags),
            }

            insert_job(job_data)

            driver.close()
            driver.switch_to.window(driver.window_handles[0])

        except Exception as e:
            print(f"Error processing job: {e}")
            if len(driver.window_handles) > 1:
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
            continue

    driver.quit()
    print(" Scraping complete.")

if __name__ == "__main__":
    try:
        app = create_app()
        with app.app_context():
            scrape_jobs()
    except Exception as e:
        print(f" Fatal error: {e}")
