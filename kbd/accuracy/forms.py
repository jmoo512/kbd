from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, SubmitField
#from wtforms.validators import DataRequired, Email
#from wtforms import ValidationError
from wtforms.fields.html5 import DateField

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

class OrderAccuracyForm(FlaskForm):
    week_ending=DateField('Week Ending: ', format='%Y-%m-%d')
    location=SelectField('Location', choices=[
                                                ('183','North'),
                                                ('360','South'),
                                                ('Round Rock','Round Rock'),
                                                ('620','620'),
                                                ('Lamar','Lamar'),
                                                ('MF1','MF1'),
                                                ('MF2','MF2'),
                                                ('MF3','MF3'),
                                                ('MF4','MF4'),
                                                ('MFT2','MFT2')
                                            ])
    inaccurate_count=IntegerField('# of Inaccurate Orders: ')
    submit=SubmitField('Add')
