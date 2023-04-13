# backend/config/config.py

import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'todo.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    pass

app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
}