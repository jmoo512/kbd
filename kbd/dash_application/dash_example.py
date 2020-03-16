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
df_efficiency_trend=df.groupby(['Location','Week Ending'])['Efficiency'].mean().astype(float).round(2).reset_index()
df_efficiency_trend=df_efficiency_trend[df_efficiency_trend['Location']=='North']

stores=['North','South','Round Rock','620','Lamar','MF1','MF2','MF3','MF4']

for i in stores:
    print({'label':i,'value':i},)

def Add_Dash(server):
    external_stylesheets = []
    external_scripts = []

    dash_app = Dash(server=server,
                    external_stylesheets=external_stylesheets,
                    external_scripts=external_scripts,
                    routes_pathname_prefix='/dash/')

    # Create Dash Layout
    dash_app.layout = html.Div([
                                html.Div([
                                dcc.Dropdown(
                                    id='store',
                                    options=[
                                        {'label':'North','value':'North'},
                                        {'label':'South','value':'South'},
                                        {'label':'Round Rock','value':'Round Rock'},
                                        {'label':'620','value':'620'},
                                        {'label':'Lamar','value':'Lamar'},
                                        {'label':'MF1','value':'MF1'},
                                        {'label':'MF2','value':'MF2'},
                                        {'label':'MF3','value':'MF3'},
                                        {'label':'MF4','value':'MF4'},
                                    ],
                                    value='North',
                                    placeholder='Select a store'
                                ),
                                dcc.Graph(id='sample',
                                                figure={'data':[
                                                            dict(
                                                                x=df_efficiency_trend['Week Ending'],
                                                                y=df_efficiency_trend['Efficiency'],
                                                                mode='lines+text',
                                                                text=df_efficiency_trend['Efficiency'],
                                                                textposition='top center',
                                                                textfont=dict(
                                                                    size=20
                                                                ),
                                                                tickmode='linear'

                                                        )],
                                                'layout':{
                                                    'title':'Cashier Efficiency'
                                                }})
                                                ])
    ])

    return dash_app.server
