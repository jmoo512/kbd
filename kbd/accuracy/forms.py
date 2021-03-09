from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, SubmitField
#from wtforms.validators import DataRequired, Email
#from wtforms import ValidationError
from wtforms.fields.html5 import DateField

#FLASK-FORM TO VALIDATE TO-GO LABEL DATA

class TGLForm(FlaskForm):
    week_ending=DateField('Week Ending: ', format='%Y-%m-%d')
    location=SelectField('Location', choices=[
                                                ('183','North'),
                                                ('360','South'),
                                                ('Round Rock','Round Rock'),
                                                ('620','620'),
                                                ('Lamar','Lamar')
                                            ])
    number_measured=IntegerField('# Measured:')
    number_passed=IntegerField('# Perfect:')

    submit=SubmitField('Add')


#FLASK-FORM TO VALIDATE ORDER ACCURACY DATA

class OrderAccuracyForm(FlaskForm):
    week_ending=DateField('Week Ending: ', format='%Y-%m-%d')
    location=SelectField('Location', choices=[
                                                ('183','North'),
                                                ('360','South'),
                                                ('Round Rock','Round Rock'),
                                                ('620','620'),
                                                ('Lamar','Lamar'),
                                                ('Concept B1','Concept B1'),
                                                ('Concept B2','Concept B2'),
                                                ('Concept B3','Concept B3'),
                                                ('Concept B4','Concept B4'),
                                                ('Concept BT2','Concept BT2')
                                            ])
    inaccurate_count=IntegerField('# of Inaccurate Orders: ')
    submit=SubmitField('Add')
