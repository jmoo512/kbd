from flask import current_app
from kbd.speed.models import CashierEfficiency
from kbd.speed.forms import CEForm
from kbd.sales.forms import SalesForm
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify
from werkzeug import secure_filename
import pandas as pd

core = Blueprint('core',__name__)

@core.route('/')
def index():
    form=CEForm()
    return render_template('index.html',form=form)

@core.route('/add')
def add():
    ceform=CEForm()
    sales_form=SalesForm()
    return render_template('add.html',ceform=ceform, sales_form=sales_form)

@core.route('/c3js')
def dash():
    return render_template('c3js.html')
