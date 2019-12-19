import os
from flask import Flask

app=Flask(__name__)



from kbd.core.views import core

app.register_blueprint(core)
