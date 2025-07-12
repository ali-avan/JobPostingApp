from db import db
from datetime import date

class Job(db.Model):
    __tablename__ = 'jobs'  

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    posting_date = db.Column(db.Date, nullable=False, default=date.today)
    job_type = db.Column(db.String(50), nullable=False)
    tags = db.Column(db.Text)  

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "posting_date": self.posting_date.strftime("%Y-%m-%d"),
            "job_type": self.job_type,
            "tags": self.tags.split(",") if self.tags else []
        }
