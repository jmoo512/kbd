from flask import current_app
from flask_login import login_required
from kbd import db
from kbd.models import FiscalCalendar
from .models import ToGoLabel
from .forms import TGLForm
from flask import render_template,Blueprint,redirect,url_for,jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()

accuracy=Blueprint('accuracy',__name__)

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
