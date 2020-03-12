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

    if form.tm_name_one.data:
        ce=CashierEfficiency(
                week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                fiscal_month=form.fiscal_month.data,
                fiscal_year=form.fiscal_year.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name_one.data,
                tm_sales=form.tm_sales_one.data,
                tm_minutes=form.tm_minutes_one.data,
                tm_efficiency=form.tm_efficiency_one.data,
                mod_one=form.mod_one.data,
                mod_two=form.mod_two.data
            )
        db.session.add(ce)
        db.session.commit()
    if form.tm_name_two.data:
        ce=CashierEfficiency(
                week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                fiscal_month=form.fiscal_month.data,
                fiscal_year=form.fiscal_year.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name_two.data,
                tm_sales=form.tm_sales_two.data,
                tm_minutes=form.tm_minutes_two.data,
                tm_efficiency=form.tm_efficiency_two.data,
                mod_one=form.mod_one.data,
                mod_two=form.mod_two.data
            )
        db.session.add(ce)
        db.session.commit()
    if form.tm_name_three.data:
        ce=CashierEfficiency(
                week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                fiscal_month=form.fiscal_month.data,
                fiscal_year=form.fiscal_year.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name_three.data,
                tm_sales=form.tm_sales_three.data,
                tm_minutes=form.tm_minutes_three.data,
                tm_efficiency=form.tm_efficiency_three.data,
                mod_one=form.mod_one.data,
                mod_two=form.mod_two.data
            )
        db.session.add(ce)
        db.session.commit()
    if form.tm_name_four.data:
        ce=CashierEfficiency(
                week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                fiscal_month=form.fiscal_month.data,
                fiscal_year=form.fiscal_year.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name_four.data,
                tm_sales=form.tm_sales_four.data,
                tm_minutes=form.tm_minutes_four.data,
                tm_efficiency=form.tm_efficiency_four.data,
                mod_one=form.mod_one.data,
                mod_two=form.mod_two.data
            )
        db.session.add(ce)
        db.session.commit()
    if form.tm_name_five.data:
        ce=CashierEfficiency(
                week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                fiscal_month=form.fiscal_month.data,
                fiscal_year=form.fiscal_year.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name_five.data,
                tm_sales=form.tm_sales_five.data,
                tm_minutes=form.tm_minutes_five.data,
                tm_efficiency=form.tm_efficiency_five.data,
                mod_one=form.mod_one.data,
                mod_two=form.mod_two.data
            )
        db.session.add(ce)
        db.session.commit()
    if form.tm_name_six.data:
        ce=CashierEfficiency(
                week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                fiscal_month=form.fiscal_month.data,
                fiscal_year=form.fiscal_year.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name_six.data,
                tm_sales=form.tm_sales_six.data,
                tm_minutes=form.tm_minutes_six.data,
                tm_efficiency=form.tm_efficiency_six.data,
                mod_one=form.mod_one.data,
                mod_two=form.mod_two.data
            )
        db.session.add(ce)
        db.session.commit()
    if form.tm_name_seven.data:
        ce=CashierEfficiency(
                week_ending=form.week_ending.data,
                fiscal_week=form.fiscal_week.data,
                fiscal_month=form.fiscal_month.data,
                fiscal_year=form.fiscal_year.data,
                location=form.location.data,
                date_measured=form.date_measured.data,
                tm_name=form.tm_name_seven.data,
                tm_sales=form.tm_sales_seven.data,
                tm_minutes=form.tm_minutes_seven.data,
                tm_efficiency=form.tm_efficiency_seven.data,
                mod_one=form.mod_one.data,
                mod_two=form.mod_two.data
            )
        db.session.add(ce)
        db.session.commit()

    return redirect(url_for('core.add'))
    return render_template('index.html',form=form)
