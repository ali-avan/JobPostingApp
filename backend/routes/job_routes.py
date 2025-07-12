from flask import Blueprint, request, jsonify
from models.job import Job
from db import db
from datetime import datetime

job_routes = Blueprint('jobs', __name__)

@job_routes.route('/jobs', methods=['GET'])
def get_jobs():
    query = Job.query

    title = request.args.get('title', '').strip()
    company = request.args.get('company', '').strip()
    job_type = request.args.get('job_type', '').strip()
    location = request.args.get('location', '').strip()
    tag = request.args.get('tag', '').strip()
    sort = request.args.get('sort', 'posting_date_desc').strip()
    q = request.args.get('q', '').strip().lower()

    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
    except ValueError:
        return jsonify({"error": "Invalid pagination parameters"}), 400

    try:
        if title:
            query = query.filter(Job.title.ilike(f"%{title}%"))
        if company:
            query = query.filter(Job.company.ilike(f"%{company}%"))
        if job_type:
            query = query.filter(Job.job_type.ilike(f"%{job_type}%"))
        if location:
            query = query.filter(Job.location.ilike(f"%{location}%"))
        if tag:
            query = query.filter(Job.tags.ilike(f"%{tag}%"))

        if sort == 'posting_date_asc':
            query = query.order_by(Job.posting_date.asc())
        else:
            query = query.order_by(Job.posting_date.desc())

        filtered_jobs = query.all()
        if q:
            filtered_jobs = [
                job for job in filtered_jobs
                if q in job.title.lower()
                or q in job.company.lower()
                or q in job.location.lower()
                or q in job.tags.lower()
            ]

        total_jobs = len(filtered_jobs)
        start = (page - 1) * limit
        end = start + limit
        paginated_jobs = filtered_jobs[start:end]

        return jsonify({
            "jobs": [job.to_dict() for job in paginated_jobs],
            "total": total_jobs,
            "page": page,
            "limit": limit
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@job_routes.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job.to_dict()), 200


@job_routes.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    required_fields = ['title', 'company', 'location', 'posting_date', 'job_type']

    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    try:
        job = Job(
            title=data['title'],
            company=data['company'],
            location=data['location'],
            posting_date=datetime.strptime(data['posting_date'], '%Y-%m-%d'),
            job_type=data['job_type'],
            tags=','.join(data.get('tags', []))
        )
        db.session.add(job)
        db.session.commit()
        return jsonify(job.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@job_routes.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    data = request.get_json()

    try:
        job.title = data.get('title', job.title)
        job.company = data.get('company', job.company)
        job.location = data.get('location', job.location)

        if 'posting_date' in data:
            job.posting_date = datetime.strptime(data['posting_date'], '%Y-%m-%d')

        job.job_type = data.get('job_type', job.job_type)

        if 'tags' in data:
            job.tags = ','.join(data['tags'])

        db.session.commit()
        return jsonify({"message": "Job updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@job_routes.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    try:
        db.session.delete(job)
        db.session.commit()
        return '', 204
    except Exception as e:
        return jsonify({"error": str(e)}), 500
