import os
from flask import Flask

app=Flask(__name__)

#config switching

if app.config['ENV']=='development':
    app.config.from_object('config.DevelopmentgConfig')

elif app.config['ENV']=='staging':
    app.config.from_object('config.StagingConfig')

else:
    app.config.from_object('config.ProductionConfig')

#import blueprints
from kbd.core.views import core

#register blueprints
app.register_blueprint(core)
