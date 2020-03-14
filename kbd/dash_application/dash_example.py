from dash import Dash
import dash_table
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd

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
                                        {'x':[1,2,3],'y':[4,1,2],'type':'bar','name':'SF'},
                                        {'x':[1,2,3],'y':[2,4,5],'type':'bar','name':'NYC'}
                                    ],
                                            'layout':{
                                                'title':'BAR PLOT'
                                            }})
    ])

    return dash_app.server
