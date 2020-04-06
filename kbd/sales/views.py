from flask import current_app
from kbd import db
from .models import Sales
from .forms import SalesForm
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2




sales=Blueprint('sales',__name__)

@sales.route('/add/',methods=['POST','PATCH'])
def add():

    form=SalesForm()

    sales=Sales(
            week_ending=form.week_ending.data,
            fiscal_month=form.fiscal_month.data,
            fiscal_year=form.fiscal_year.data,
            week_of_month=form.week_of_month.data,
            week_of_year=form.week_of_year.data,
            concept=form.concept.data,
            location=form.location.data,
            sales=form.sales.data,
            bbq_sales=form.bbq_sales.data,
            taco_sales=form.taco_sales.data,
            group_meal_sales=form.group_meal_sales.data,
            mavn_sales=form.mavn_sales.data,
            doordash_sales=form.doordash_sales.data,
            total_guest_count=form.total_guest_count.data,
            bbq_guest_count=form.bbq_guest_count.data,
            taco_guest_count=form.taco_guest_count.data
        )
    db.session.add(sales)
    db.session.commit()

    return redirect(url_for('core.add'))


@sales.route('/salesdf')
def salesdf():
    params=config()
    conn=psycopg2.connect(**params)


    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_ending,week_of_year,location,sales, fiscal_year FROM sales WHERE week_ending > '2017-12-31'")
    cur.close()
    conn.close()

    df=sales_data

    return Response(df.to_json(orient="records"), mimetype='application/json')
