import os, secrets
key=secrets.token_urlsafe(32)
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG=False
    TESTING=False
    SECRET_KEY = key
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')

class DevelopmentgConfig(Config):
    DEBUG=True

class StagingConfig(Config):
    DEBUG=False
    SQLALCHEMY_DATABASE_URI = ''

class ProductionConfig(Config):
    DEBUG=False
