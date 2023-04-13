# backend/app/__init__.py

from flask import Flask
from flask_cors import CORS


def create_app(config_name):
    app = Flask(__name__)
    CORS(app)

    from app.routes import todos_bp
    app.register_blueprint(todos_bp)

    return app