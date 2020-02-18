from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo
from wtforms import ValidationError
from wtforms.fields.html5 import DateField

class CEForm(FlaskForm):
    week_ending=DateField('Week Ending', format='%Y-%m-%d')
    fiscal_week=IntegerField('Fiscal Week')
    location=SelectField('Location', choices=[('North','North'),('South','South'),('Round Rock','Round Rock'),('620','620'),('Lamar','Lamar'),('MF1','MF1'),('MF2','MF2'),('MF3','MF3'),('MF4','MF4'),('MFT2','MF Trailer')])
    date_measured=DateField('Date Measured', format='%Y-%m-%d')
    tm_name=StringField('TM Name')
    tm_sales=FloatField('Sales')
    tm_minutes=IntegerField('Minutes Observed')
    tm_efficiency=FloatField('Efficiency')
    submit=SubmitField('Add')
