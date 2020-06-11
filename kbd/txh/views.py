from flask import current_app
from kbd import db
from kbd.models import FiscalCalendar
from .forms import GFForm
from .models import GameFilm
from flask import render_template,Blueprint,redirect,url_for,jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()


txh=Blueprint('txh',__name__)

@txh.route('/gf_add/',methods=['POST'])
def gf_add():

    form=GFForm()

    if form.location.data in ['183','360','Round Rock','620','Lamar']:
        concept='Rudys'
    else:
        concept='Mighty Fine'

    calendar=FiscalCalendar.query.filter(FiscalCalendar.date==form.date_measured.data).first_or_404()

    gf=GameFilm(
            week_ending=calendar.week_ending,
            location=form.location.data,
            date_measured=form.date_measured.data,
            type=form.type.data,
            score=form.score.data,
            concept=concept,
            fiscal_month=calendar.fiscal_month,
            fiscal_year=calendar.fiscal_year,
            week_of_month=calendar.week_of_month,
            week_of_year=calendar.fiscal_week,
            quarter=calendar.fiscal_quarter
        )
    db.session.add(gf)
    db.session.commit()

    return redirect(url_for('core.add'))

@txh.route('/gf/<chosen_location>')
def gf(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    gf_data = create_pandas_table("SELECT fiscal_year, fiscal_month, week_of_month, week_of_year, quarter, score FROM gamefilm WHERE location = '" + chosen_location + "' AND quarter=(SELECT MAX(quarter) FROM inspections) OR quarter=(SELECT MAX(quarter)-1 FROM inspections) ORDER BY fiscal_year, quarter, fiscal_month, week_of_month")
    cur.close()
    conn.close()

    df=gf_data

    return Response(df.to_json(orient="records"), mimetype='application/json')

@txh.route('/gf_concept/<chosen_concept>')
def gf_concept(chosen_concept):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    gf_data = create_pandas_table("SELECT fiscal_year, fiscal_month, week_of_month, week_of_year, quarter, score FROM gamefilm WHERE concept = '" + chosen_concept + "' AND quarter=(SELECT MAX(quarter) FROM inspections) OR quarter=(SELECT MAX(quarter)-1 FROM inspections) ORDER BY fiscal_year, quarter, fiscal_month, week_of_month")
    cur.close()
    conn.close()

    df=gf_data

    return Response(df.to_json(orient="records"), mimetype='application/json')
