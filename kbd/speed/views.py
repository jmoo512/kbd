from kbd import app, APP_STATIC
from .models import CashierEfficiency
from .forms import CEForm
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify
from werkzeug import secure_filename
import pandas as pd
import os

speed = Blueprint('speed',__name__)

@speed.route('/speed/ce')
def index():
    form=CEForm()
    return render_template('index.html',form=form)
