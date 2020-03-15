from dash import Dash
import dash_table
import dash_core_components as dcc
import dash_html_components as html
import psycopg2
import pandas as pd
from psql_config import config

params=config()
conn=psycopg2.connect(**params)

def create_pandas_table(sql_query, database = conn):
    table = pd.read_sql_query(sql_query, database, parse_dates=['week_ending','date_measured'])
    return table

cur = conn.cursor()
ce_data = create_pandas_table("SELECT * FROM ce")
cur.close()
conn.close()
df=ce_data

df.drop(columns='id',inplace=True)

df.rename(columns={'week_ending':'Week Ending',
                    'fiscal_week':'Fiscal Week',
                    'location':'Location',
                    'date_measured':'Date Measured',
                    'tm_name':'TM',
                    'tm_sales':'Sales',
                    'tm_minutes':'Minutes',
                    'tm_efficiency':'Efficiency',
                    'fiscal_month':'Month',
                    'fiscal_year':'Year',
                    'mod_one':'FOH MOD',
                    'mod_two':'BOH MOD'}
                    ,inplace=True)

df_avg_efficiency=df.groupby(['Location'])['Efficiency'].mean().astype(float).round(2).reset_index().sort_values('Efficiency',ascending=False)


def Add_Dash(server):
    external_stylesheets = []
    external_scripts = []

    dash_app = Dash(server=server,
                    external_stylesheets=external_stylesheets,
                    external_scripts=external_scripts,
                    routes_pathname_prefix='/dash/')

    # Create Dash Layout
    dash_app.layout = html.Div(children=[
                                dcc.Graph(id='sample',
                                                figure={'data':[
                                                    {'x':df_avg_efficiency['Location'],'y':df_avg_efficiency['Efficiency'],'type':'bar','name':'North'}
                                                                                                    ],
                                                'layout':{
                                                    'title':'Average Cashier Efficiency'
                                                }})
    ])

    return dash_app.server
