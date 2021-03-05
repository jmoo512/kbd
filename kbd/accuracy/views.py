from flask import current_app
from flask_login import login_required
from kbd import db
from kbd.models import FiscalCalendar
from .models import ToGoLabel, OrderAccuracy
from .forms import TGLForm, OrderAccuracyForm
from flask import render_template,Blueprint,redirect,url_for,jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()

accuracy=Blueprint('accuracy',__name__)


#ADD TO-GO LABEL DATA TO DB

@accuracy.route('/tgl_add/', methods=['POST'])
def tgl_add():
    form=TGLForm()

    calendar=FiscalCalendar.query.filter(FiscalCalendar.date==form.week_ending.data).first_or_404()

    tgl=ToGoLabel(
            week_ending=form.week_ending.data,
            location=form.location.data,
            fiscal_month=calendar.fiscal_month,
            fiscal_year=calendar.fiscal_year,
            week_of_month=calendar.week_of_month,
            week_of_year=calendar.fiscal_week,
            quarter=calendar.fiscal_quarter,
            number_measured=form.number_measured.data,
            number_passed=form.number_passed.data

    )
    db.session.add(tgl)
    db.session.commit()

    return redirect(url_for('core.add'))


#ADD ORDER ACCURACY DATA TO DB

@accuracy.route('/acc_add/', methods=['POST'])
def acc_add():
    form=OrderAccuracyForm()

    calendar=FiscalCalendar.query.filter(FiscalCalendar.date==form.week_ending.data).first_or_404()

    acc=OrderAccuracy(
        week_ending=form.week_ending.data,
        location=form.location.data,
        fiscal_month=calendar.fiscal_month,
        fiscal_year=calendar.fiscal_year,
        week_of_month=calendar.week_of_month,
        week_of_year=calendar.fiscal_week,
        quarter=calendar.fiscal_quarter,
        inaccurate_count=form.inaccurate_count.data
    )
    db.session.add(acc)
    db.session.commit()

    return redirect(url_for('core.add'))



#GET TO-GO LABEL DATA FROM DB FOR CHOSEN LOCATION

@accuracy.route('/tgl/<chosen_location>')
def tgl(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    tgl_data = create_pandas_table("SELECT fiscal_year, fiscal_month, week_of_month, week_of_year, week_ending, quarter, number_measured, number_passed FROM tgl WHERE location = '" + chosen_location + "' AND (quarter=(SELECT MAX(quarter) FROM tgl) OR quarter=(SELECT MAX(quarter)-1 FROM tgl)) ORDER BY fiscal_year, quarter, fiscal_month, week_of_month")
    cur.close()
    conn.close()

    df=tgl_data

    return Response(df.to_json(orient="records"), mimetype='application/json')


#GET TO-GO LABEL DATA FORM DB FOR CHOSEN CONCEPT

@accuracy.route('/tgl_concept')
def tgl_concept():

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    tgl_data = create_pandas_table("SELECT fiscal_year, fiscal_month, week_of_month, week_of_year, week_ending, quarter, number_measured, number_passed FROM tgl WHERE (quarter=(SELECT MAX(quarter) FROM tgl) OR quarter=(SELECT MAX(quarter)-1 FROM tgl)) ORDER BY fiscal_year, quarter, fiscal_month, week_of_month")
    cur.close()
    conn.close()

    df=tgl_data

    return Response(df.to_json(orient="records"), mimetype='application/json')


#GET ORDER ACCURACY DATA FROM DB FOR CHOSEN LOCATION

@accuracy.route('/acc/<chosen_location>')
def acc(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    acc_data = create_pandas_table("SELECT o.fiscal_year, o.fiscal_month, o.week_of_month, o.week_of_year, o.week_ending, o.quarter, o.inaccurate_count, s.total_guest_count FROM orderaccuracy AS o INNER JOIN sales AS s ON o.location = s.location AND o.week_ending = s.week_ending WHERE o.location = '" + chosen_location + "' AND (o.quarter=(SELECT MAX(quarter) FROM orderaccuracy) OR o.quarter=(SELECT MAX(quarter)-1 FROM orderaccuracy)) ORDER BY o.fiscal_year, o.quarter, o.fiscal_month, o.week_of_month")
    cur.close()
    conn.close()

    df=acc_data

    return Response(df.to_json(orient="records"), mimetype='application/json')


#GET ORDER ACCURACY DATA FROM DB FOR CHOSEN CONCEPT

@accuracy.route('/acc_concept/<chosen_concept>')
def acc_concept(chosen_concept):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    acc_data = create_pandas_table("SELECT o.fiscal_year, o.fiscal_month, o.week_of_month, o.week_of_year, o.week_ending, o.quarter, o.inaccurate_count, s.total_guest_count FROM orderaccuracy AS o INNER JOIN sales AS s ON o.concept = s.concept AND o.location = s.location AND o.week_ending = s.week_ending WHERE o.concept = '" + chosen_concept + "' AND (o.quarter=(SELECT MAX(quarter) FROM orderaccuracy) OR o.quarter=(SELECT MAX(quarter)-1 FROM orderaccuracy)) ORDER BY o.fiscal_year, o.quarter, o.fiscal_month, o.week_of_month")
    cur.close()
    conn.close()

    df=acc_data

    return Response(df.to_json(orient="records"), mimetype='application/json')