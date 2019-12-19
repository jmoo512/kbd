import os
from flask import Flask

app=Flask(__name__)


#import blueprints
from kbd.core.views import core

#register blueprints
app.register_blueprint(core)
