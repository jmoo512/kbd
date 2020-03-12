from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo
from wtforms import ValidationError
from wtforms.fields.html5 import DateField

class CEForm(FlaskForm):
    week_ending=DateField('Week Ending', format='%Y-%m-%d')
    fiscal_week=SelectField('Fiscal Week', choices=[
                                                    ('1','1'),
                                                    ('2','2'),
                                                    ('3','3'),
                                                    ('4','4'),
                                                    ('5','5')
                                                ])
    fiscal_month=SelectField('Fiscal Month', choices=[
                                                        ('January','January'),
                                                        ('February','February'),
                                                        ('March','March'),
                                                        ('April','April'),
                                                        ('May','May'),
                                                        ('June','June'),
                                                        ('July','July'),
                                                        ('August','Augst'),
                                                        ('September','September'),
                                                        ('October','October'),
                                                        ('November','November'),
                                                        ('December','December')
                                                    ])
    fiscal_year=SelectField('Fiscal Year', choices=[('2020','2020')])
    location=SelectField('Location', choices=[
                                                ('North','North'),
                                                ('South','South'),
                                                ('Round Rock','Round Rock'),
                                                ('620','620'),
                                                ('Lamar','Lamar'),
                                                ('MF1','MF1'),
                                                ('MF2','MF2'),
                                                ('MF3','MF3'),
                                                ('MF4','MF4')
                                            ])
    date_measured=DateField('Date Measured', format='%Y-%m-%d')
    tm_name=StringField('TM Name')
    tm_sales=FloatField('Sales')
    tm_minutes=IntegerField('Minutes Observed')
    tm_efficiency=FloatField('Efficiency')
    mod_one=StringField('FOH MOD')
    mod_two=StringField('BOH MOD')
    submit=SubmitField('Add')
