import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

APP_ROOT = os.path.abspath(os.path.dirname(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')

app = Flask(__name__)

#config switching

if app.config['ENV']=='development':
    app.config.from_object('config.DevelopmentgConfig')

elif app.config['ENV']=='staging':
    app.config.from_object('config.StagingConfig')

else:
    app.config.from_object('config.ProductionConfig')

db = SQLAlchemy(app)
Migrate(app,db)

#import blueprints
from kbd.core.views import core
from kbd.speed.views import speed


#register blueprints
app.register_blueprint(core)
app.register_blueprint(speed)
