from dash import Dash
from dash.dependencies import Input, Output
import dash_table
import dash_core_components as dcc
import dash_html_components as html
import psycopg2
import pandas as pd
from psql_config import config
from datetime import datetime as dt

params=config()
conn=psycopg2.connect(**params)

def create_pandas_table(sql_query, database = conn):
    table = pd.read_sql_query(sql_query, database)
    return table

cur = conn.cursor()
sales_data = create_pandas_table("SELECT * FROM sales WHERE week_ending > '2017-12-31'")
cur.close()
conn.close()

df=sales_data

#find highest year in df
max_year=df['fiscal_year'].max()

#find current week based on last entry in df
curr_week=df[df['fiscal_year']==max_year]['week_of_year'].max()

#set starting range for sales graph
start_week=curr_week-6

#df_avg_efficiency=df_ce.groupby(['Location'])['Efficiency'].mean().astype(float).round(2).reset_index().sort_values('Efficiency',ascending=False)
#df_efficiency_trend=df_ce.groupby(['Location','Week Ending'])['Efficiency'].mean().astype(float).round(2).reset_index()


df=df[df['location']=='183']
df['week_ending']=df['week_ending'].astype('datetime64[ns]')
df.sort_values(by='week_ending', inplace=True)
df.reset_index(inplace=True)
df.drop(columns='index')



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
                                        {'label':'North','value':'183'},
                                        {'label':'South','value':'360'},
                                        {'label':'Round Rock','value':'Round Rock'},
                                        {'label':'620','value':'620'},
                                        {'label':'Lamar','value':'Lamar'},
                                        {'label':'MF1','value':'MF1'},
                                        {'label':'MF2','value':'MF2'},
                                        {'label':'MF3','value':'MF3'},
                                        {'label':'MF4','value':'MF4'},
                                        {'label':'MFT2','value':'MFT2'}
                                            ],
                                    value='183',
                                    placeholder='Select a store'
                                ),
                                dcc.Graph(id='sales',
                                                figure={'data':[
                                                            {'x':df[df['fiscal_year']==2018]['week_of_year'],'y':df[df['fiscal_year']==2018]['sales'],'type':'lines','name':'2018'},
                                                            {'x':df[df['fiscal_year']==2019]['week_of_year'],'y':df[df['fiscal_year']==2019]['sales'],'type':'lines','name':'2019'},
                                                            {'x':df[df['fiscal_year']==2020]['week_of_year'],'y':df[df['fiscal_year']==2020]['sales'],'type':'lines','name':'2020'}
                                                            ],
                                                        'layout':{
                                                            'title':'Weekly Sales',
                                                            'xaxis': {'title':'Week of the Year'}
                                                                }
                                                        })
                                            ])
                                    ])

    init_callbacks(dash_app)
    return dash_app.server

def init_callbacks(dash_app):
    @dash_app.callback(
        Output(component_id='sales', component_property='figure'),
        [Input(component_id='store', component_property='value')])
    def update_sales(update_sales_chart):
        df=df[(df['location']==update_sales_chart)]
        df['week_ending']=df['week_ending'].astype('datetime64[ns]')
        df.sort_values(by='week_ending', inplace=True)
        df.reset_index(inplace=True)
        df.drop(columns='index')
        return {'data':[
                    {'x':df[df['fiscal_year']==2018]['week_of_year'],'y':df[df['fiscal_year']==2018]['sales'],'type':'lines','name':'2018'},
                    {'x':df[df['fiscal_year']==2019]['week_of_year'],'y':df[df['fiscal_year']==2019]['sales'],'type':'lines','name':'2019'},
                    {'x':df[df['fiscal_year']==2020]['week_of_year'],'y':df[df['fiscal_year']==2020]['sales'],'type':'lines','name':'2020'}
                    ],
                'layout':{
                    'title':'Weekly Sales',
                    'xaxis': {'title':'Week of the Year'}
                }}
