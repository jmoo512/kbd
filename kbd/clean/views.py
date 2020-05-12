from flask import current_app
from flask_login import login_required
from kbd import db
from .models import Inspections
from .forms import InspForm
from flask import render_template,Blueprint,redirect,url_for,jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()


clean=Blueprint('clean',__name__)


@clean.route('/clean_add/',methods=['POST'])
#@login_required
def clean_add():

    form=InspForm()

    insp=Inspections(
            week_ending=form.week_ending.data,
            location=form.location.data,
            date_measured=form.date_measured.data,
            score=form.score.data,
            concept=form.concept.data,
            fiscal_month=form.fiscal_month.data,
            fiscal_year=form.fiscal_year.data,
            week_of_month=form.week_of_month.data,
            week_of_year=form.week_of_year.data
        )
    db.session.add(insp)
    db.session.commit()

    return redirect(url_for('core.add'))

@clean.route('/insp/<chosen_location>')
def insp(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    insp_data = create_pandas_table("SELECT fiscal_year, fiscal_month, week_of_month, score FROM inspections WHERE fiscal_year=(SELECT MAX(fiscal_year) FROM inspections) AND fiscal_month=(SELECT MAX(fiscal_month) FROM inspections) AND location = '" + chosen_location + "'")
    cur.close()
    conn.close()

    df=insp_data

    return Response(df.to_json(orient="records"), mimetype='application/json')
