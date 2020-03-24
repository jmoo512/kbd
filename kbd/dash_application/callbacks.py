def init_callbacks(dash_app):
    @dash_app.callback(
        Output(component_id='sales', component_property='figure'),
        [Input(component_id='store', component_property='value')])
    def update_sales(update_sales_chart):
        df=df_sales[(df_sales['location']==update_sales_chart)]
        df['week_ending']=df['week_ending'].astype('datetime64[ns]')
        df.sort_values(by='week_ending', inplace=True)
        df.reset_index(inplace=True)
        df.drop(columns='index')
        return {'data':[
                    dict(
                        x=df['week_ending'],
                        y=df['sales'],
                        mode='lines'
                    )],
                'layout':{
                    'title':'Sales'
                }}
