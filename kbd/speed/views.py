from kbd import app, APP_STATIC, db
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
    result=CashierEfficiency.query.all()
    return render_template('index.html',form=form,result=result)

@speed.route('/add',methods=['GET','POST'])
def add():


    form=CEForm()

    ce=CashierEfficiency(week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name.data,
                tm_sales=form.tm_sales.data,
                tm_minutes=form.tm_minutes.data,
                tm_efficiency=form.tm_efficiency.data)
    db.session.add(ce)
    db.session.commit()
    return redirect(url_for('speed.index'))
    return render_template('index.html',form=form)
