import os, secrets
key=secrets.token_urlsafe(32)
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG=True
    #TESTING=False
    SECRET_KEY = key
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_DATABASE_URI = 'postgres://aobhdjhqnrrcrb:cea328c1695a2b2cccaf0d79fa8312356185029ab8d391e56ba2e1d18b87b6c2@ec2-184-73-210-189.compute-1.amazonaws.com:5432/d2pmjsmj1pat21'

#class DevelopmentgConfig(Config):
#    DEBUG=True
#    SQLALCHEMY_TRACK_MODIFICATIONS=False

#class StagingConfig(Config):
#    DEBUG=False
#    SQLALCHEMY_TRACK_MODIFICATIONS=False

#class ProductionConfig(Config):
#    DEBUG=False
#    SQLALCHEMY_TRACK_MODIFICATIONS=False
