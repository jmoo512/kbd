from flask import current_app
from flask_login import login_required
from kbd import db
from kbd.models import FiscalCalendar
from .models import Sales
from .forms import SalesForm
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()


sales=Blueprint('sales',__name__)

@sales.route('/sales_add/',methods=['POST'])
#@login_required
def sales_add():




    form=SalesForm()

    if form.location.data in ['183','360','Round Rock','620','Lamar']:
        concept='Rudys'
    else:
        concept='Mighty Fine'

    print(form.week_ending.data)
    calendar=FiscalCalendar.query.filter(FiscalCalendar.week_ending==form.week_ending.data).first_or_404()

    sales=Sales(
            week_ending=form.week_ending.data,
            fiscal_month=calendar.fiscal_month,
            fiscal_year=calendar.fiscal_year,
            week_of_month=calendar.week_of_month,
            week_of_year=calendar.fiscal_week,
            concept=concept,
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

#api for store level sales and guest count
@sales.route('/sales/<chosen_location>')
#@login_required
def sales_gc(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_of_year, sales, total_guest_count, bbq_guest_count, taco_guest_count, fiscal_year FROM sales WHERE fiscal_year > 2017 AND location = '" + chosen_location + "' ORDER BY week_of_year, fiscal_year")
    cur.close()
    conn.close()

    df=sales_data

    df.fillna(0,inplace=True)

    #find current year
    current_year=df['fiscal_year'].max()

    #find current week based on last entry in df
    curr_week=df[df['fiscal_year']==current_year]['week_of_year'].max()
    beg_week=curr_week-6
    end_week=curr_week+6

    #set range of weeks for chart view
    df=df[(df['week_of_year'] >= beg_week) & (df['week_of_year'] <= end_week)]

    #calculate percent change in sales and guest count
    df['percent_sales']=df['sales'].pct_change().round(4)*100
    df['percent_guest_count']=df['total_guest_count'].pct_change().round(4)*100
    df['percent_bbq']=df['bbq_guest_count'].pct_change().round(4)*100
    df['percent_tacos']=df['taco_guest_count'].pct_change().round(4)*100
    df.sort_values(by=['fiscal_year','week_of_year'],inplace=True)

    return Response(df.to_json(orient="records"), mimetype='application/json')

#api for store level cumulative sales
@sales.route('/cumul/<chosen_location>')
#@login_required
def cumul(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_of_year, sales, fiscal_year FROM sales WHERE fiscal_year > 2017 AND location = '" + chosen_location + "' ORDER BY week_of_year, fiscal_year")
    cur.close()
    conn.close()



    df=sales_data

    df.fillna(0,inplace=True)

    #find current year
    current_year=df['fiscal_year'].max()

    #find current week based on last entry in df
    curr_week=df[df['fiscal_year']==current_year]['week_of_year'].max()
    beg_week=curr_week-6
    end_week=curr_week+6

    df_cumul=df.groupby(['fiscal_year','week_of_year'])['sales'].sum().reset_index()

    #break into 3 different dfs to calculate cumulative sales per year
    df_cumul_2018=df_cumul[df_cumul['fiscal_year']==2018]
    df_cumul_2018['cumulative']=df_cumul_2018['sales'].cumsum()
    df_cumul_2018=df_cumul_2018[(df_cumul_2018['week_of_year'] >= beg_week) & (df_cumul_2018['week_of_year'] <= end_week)]
    df_cumul_2018.drop(columns=['sales'],inplace=True)

    df_cumul_2019=df_cumul[df_cumul['fiscal_year']==2019]
    df_cumul_2019['cumulative']=df_cumul_2019['sales'].cumsum()
    df_cumul_2019=df_cumul_2019[(df_cumul_2019['week_of_year'] >= beg_week) & (df_cumul_2019['week_of_year'] <= end_week)]
    df_cumul_2019.drop(columns=['sales'],inplace=True)

    df_cumul_2020=df_cumul[df_cumul['fiscal_year']==2020]
    df_cumul_2020['cumulative']=df_cumul_2020['sales'].cumsum()
    df_cumul_2020=df_cumul_2020[(df_cumul_2020['week_of_year'] >= beg_week) & (df_cumul_2020['week_of_year'] <= end_week)]
    df_cumul_2020.drop(columns=['sales'],inplace=True)

    #concatenate above dataframs
    frames = [df_cumul_2018, df_cumul_2019, df_cumul_2020]
    result=pd.concat(frames)

    result.sort_values(by=['week_of_year','fiscal_year'],inplace=True)
    result['percent_cumul']=result['cumulative'].pct_change().round(4)*100
    result.sort_values(by=['fiscal_year','week_of_year'],inplace=True)

    return Response(result.to_json(orient="records"), mimetype='application/json')

#api to gather company level sales and guest counts
@sales.route('/total_sales')
#@login_required
def total_sales():

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_of_year, sales, total_guest_count, fiscal_year FROM sales WHERE fiscal_year > 2017 ORDER BY week_of_year, fiscal_year")
    cur.close()
    conn.close()

    df=sales_data

    df.fillna(0,inplace=True)

    #find current year
    current_year=df['fiscal_year'].max()

    #find current week based on last entry in df
    curr_week=df[df['fiscal_year']==current_year]['week_of_year'].max()
    beg_week=curr_week-6
    end_week=curr_week+6

    #set range of weeks for chart view
    df=df[(df['week_of_year'] >= beg_week) & (df['week_of_year'] <= end_week)]

    #split df in pieace, group and aggregate sales and guest counts
    df_agg_sales=df.groupby(['fiscal_year','week_of_year'])['sales'].sum().reset_index()
    df_agg_gc=df.groupby(['fiscal_year','week_of_year'])['total_guest_count'].sum().reset_index()

    df_agg_sales.sort_values(by=['week_of_year','fiscal_year'],inplace=True)
    df_agg_gc.sort_values(by=['week_of_year','fiscal_year'],inplace=True)

    #calculate percent change sales and guest count
    df_agg_sales['percent_sales']=df_agg_sales['sales'].pct_change().round(4)*100
    df_agg_gc['percent_guest_count']=df_agg_gc['total_guest_count'].pct_change().round(4)*100
    df_agg_sales.sort_values(by=['fiscal_year','week_of_year'],inplace=True)
    df_agg_gc.sort_values(by=['fiscal_year','week_of_year'],inplace=True)

    #merge dfs together
    df_total=df_agg_sales.join(df_agg_gc, lsuffix='_l',rsuffix='_r')

    df_total.drop(columns=['fiscal_year_r','week_of_year_r'],inplace=True)
    df_total.rename(columns={'fiscal_year_l':'fiscal_year','week_of_year_l':'week_of_year'},inplace=True)



    return Response(df_total.to_json(orient="records"), mimetype='application/json')

#api for company level cumulative sales
@sales.route('/total_cumul')
#@login_required
def total_cumul():

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_of_year, sales, fiscal_year FROM sales WHERE fiscal_year > 2017 ORDER BY week_of_year, fiscal_year")
    cur.close()
    conn.close()

    df=sales_data

    df.fillna(0,inplace=True)

    #find current year
    current_year=df['fiscal_year'].max()

    #find current week based on last entry in df
    curr_week=df[df['fiscal_year']==current_year]['week_of_year'].max()
    beg_week=curr_week-6
    end_week=curr_week+6

    df_cumul=df.groupby(['fiscal_year','week_of_year'])['sales'].sum().reset_index()

    #split into dfs by year, calculate cumulative sales by year
    df_cumul_2018=df_cumul[df_cumul['fiscal_year']==2018]
    df_cumul_2018['cumulative']=df_cumul_2018['sales'].cumsum()
    df_cumul_2018=df_cumul_2018[(df_cumul_2018['week_of_year'] >= beg_week) & (df_cumul_2018['week_of_year'] <= end_week)]
    df_cumul_2018.drop(columns=['sales'],inplace=True)

    df_cumul_2019=df_cumul[df_cumul['fiscal_year']==2019]
    df_cumul_2019['cumulative']=df_cumul_2019['sales'].cumsum()
    df_cumul_2019=df_cumul_2019[(df_cumul_2019['week_of_year'] >= beg_week) & (df_cumul_2019['week_of_year'] <= end_week)]
    df_cumul_2019.drop(columns=['sales'],inplace=True)

    df_cumul_2020=df_cumul[df_cumul['fiscal_year']==2020]
    df_cumul_2020['cumulative']=df_cumul_2020['sales'].cumsum()
    df_cumul_2020=df_cumul_2020[(df_cumul_2020['week_of_year'] >= beg_week) & (df_cumul_2020['week_of_year'] <= end_week)]
    df_cumul_2020.drop(columns=['sales'],inplace=True)

    #concatanate dfs
    frames = [df_cumul_2018, df_cumul_2019, df_cumul_2020]
    result=pd.concat(frames)

    result.sort_values(by=['week_of_year', 'fiscal_year'],inplace=True)
    result['percent_cumul']=result['cumulative'].pct_change().round(4)*100
    result.sort_values(by=['fiscal_year','week_of_year'],inplace=True)

    return Response(result.to_json(orient="records"), mimetype='application/json')


#api for weekly store sales and guest count
@sales.route('/weekly/<chosen_location>')
#@login_required
def weekly(chosen_location):

    conn=psycopg2.connect(**params)
    def create_pandas_table(sql_query, database = conn):
        table = pd.read_sql_query(sql_query, database)
        return table

    cur = conn.cursor()
    sales_data = create_pandas_table("SELECT week_of_year, sales, total_guest_count, mavn_sales, doordash_sales, bbq_sales, taco_sales, bbq_guest_count, taco_guest_count, fiscal_year FROM sales WHERE fiscal_year > 2017 AND location = '" + chosen_location + "' ORDER BY week_of_year, fiscal_year")
    cur.close()
    conn.close()

    df=sales_data

    df.fillna(0,inplace=True)

    #find current year
    current_year=df['fiscal_year'].max()

    #find current week based on last entry in df
    curr_week=df[df['fiscal_year']==current_year]['week_of_year'].max()
    beg_week=curr_week-6
    end_week=curr_week+6

    #set range of weeks for chart view
    df=df[(df['week_of_year'] >= beg_week) & (df['week_of_year'] <= end_week)]

    #calculate percent change in sales and guest count
    df['percent_sales']=df['sales'].pct_change().round(4)*100
    df['percent_guest_count']=df['total_guest_count'].pct_change().round(4)*100
    df['percent_bbq']=df['bbq_guest_count'].pct_change().round(4)*100
    df['percent_tacos']=df['taco_guest_count'].pct_change().round(4)*100
    df['percent_olo']=df['mavn_sales'].pct_change().round(4)*100
    df['percent_doordash']=df['doordash_sales'].pct_change().round(4)*100
    df.sort_values(by=['fiscal_year','week_of_year'],inplace=True)

    return Response(df.to_json(orient="records"), mimetype='application/json')
