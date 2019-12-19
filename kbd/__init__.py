import os
from flask import Flask
import dash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

basedir = os.path.abspath(os.path.dirname(__file__))

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


#register blueprints
app.register_blueprint(core)
