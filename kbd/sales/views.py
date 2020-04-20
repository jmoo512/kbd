from flask import current_app
from kbd import db
from .models import Sales
from .forms import SalesForm
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()


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


@sales.route('/sales2018/<chosen_location>')
def sales2018(chosen_location):
    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_of_year, sales, total_guest_count, fiscal_year FROM sales WHERE location = '" + chosen_location + "'")
    cur.close()
    conn.close()

    df=sales_data

    df.fillna(0,inplace=True)

    #find current year
    current_year=df['fiscal_year'].max()

    #find current week based on last entry in df
    curr_week=df[df['fiscal_year']==current_year]['week_of_year'].max()

    df=df[(df['week_of_year'] >= curr_week-4) & (df['week_of_year'] <= curr_week+4)]

    return Response(df.to_json(orient="records"), mimetype='application/json')

@sales.route('/salesdf/')
def salesdf():

    q=Sales.query.all()
    sales_df = pd.read_sql(q,con=db.engine)

    return Response(sales_df.to_json(orient="records"), mimetype='application/json')
