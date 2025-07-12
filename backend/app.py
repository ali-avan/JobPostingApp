from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from db import db
from routes.job_routes import job_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)

    app.register_blueprint(job_routes)

    @app.route('/')
    def home():
        return jsonify({"message": "Welcome to the Job API!"}), 200

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
