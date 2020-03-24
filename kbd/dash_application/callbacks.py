def init_callbacks(dash_app):
    @app.callback(
        Output(component_id='sales', component_property='children'),
        [Input(component_id='store', component_property='value')])
    def update_sales(input_value):
        return 'You\'ve entered "{}"'.format(input_value)
