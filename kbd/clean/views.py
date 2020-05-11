from flask import current_app
from flask_login import login_required
from kbd import db
from .models import Inspections
from .forms import InspForm
from flask import render_template,Blueprint,redirect,url_for
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

@clean.route('/insp/<chosen_location')
def insp(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_of_year, sales, total_guest_count, fiscal_year FROM sales WHERE fiscal_year > 2017 AND location = '" + chosen_location + "' ORDER BY week_of_year, fiscal_year")
    cur.close()
    conn.close()
