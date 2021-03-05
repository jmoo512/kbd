from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo
from wtforms import ValidationError
from wtforms.fields.html5 import DateField

#FLASK-FORM TO VALIDATE CASHIER EFFICIENCY DATA
class CEForm(FlaskForm):
    week_ending=DateField('Week Ending', format='%Y-%m-%d')
    week_of_month=SelectField('Week of Month', choices=[
                                                    ('1','1'),
                                                    ('2','2'),
                                                    ('3','3'),
                                                    ('4','4'),
                                                    ('5','5')
                                                ])
    fiscal_month=SelectField('Fiscal Month', choices=[
                                                        ('01','January'),
                                                        ('02','February'),
                                                        ('03','March'),
                                                        ('04','April'),
                                                        ('05','May'),
                                                        ('06','June'),
                                                        ('07','July'),
                                                        ('08','Augst'),
                                                        ('09','September'),
                                                        ('10','October'),
                                                        ('11','November'),
                                                        ('12','December')
                                                    ])
    fiscal_year=SelectField('Fiscal Year', choices=[('2020','2020')])
    location=SelectField('Location', choices=[
                                                ('183','North'),
                                                ('360','South'),
                                                ('Round Rock','Round Rock'),
                                                ('620','620'),
                                                ('Lamar','Lamar'),
                                                ('MF1','MF1'),
                                                ('MF2','MF2'),
                                                ('MF3','MF3'),
                                                ('MF4','MF4')
                                            ])
    date_measured=DateField('Date Measured', format='%Y-%m-%d')
    tm_name_one=StringField('TM Name: ')
    tm_name_two=StringField('TM Name: ')
    tm_name_three=StringField('TM Name: ')
    tm_name_four=StringField('TM Name: ')
    tm_name_five=StringField('TM Name: ')
    tm_name_six=StringField('TM Name: ')
    tm_name_seven=StringField('TM Name: ')
    tm_sales_one=FloatField('Sales: ')
    tm_sales_two=FloatField('Sales: ')
    tm_sales_three=FloatField('Sales: ')
    tm_sales_four=FloatField('Sales: ')
    tm_sales_five=FloatField('Sales: ')
    tm_sales_six=FloatField('Sales: ')
    tm_sales_seven=FloatField('Sales: ')
    tm_minutes_one=IntegerField('Minutes Observed: ')
    tm_minutes_two=IntegerField('Minutes Observed: ')
    tm_minutes_three=IntegerField('Minutes Observed: ')
    tm_minutes_four=IntegerField('Minutes Observed: ')
    tm_minutes_five=IntegerField('Minutes Observed: ')
    tm_minutes_six=IntegerField('Minutes Observed: ')
    tm_minutes_seven=IntegerField('Minutes Observe: ')
    tm_efficiency_one=FloatField('Efficiency: ')
    tm_efficiency_two=FloatField('Efficiency: ')
    tm_efficiency_three=FloatField('Efficiency: ')
    tm_efficiency_four=FloatField('Efficiency: ')
    tm_efficiency_five=FloatField('Efficiency: ')
    tm_efficiency_six=FloatField('Efficiency: ')
    tm_efficiency_seven=FloatField('Efficiency: ')
    mod_one=StringField('FOH MOD: ')
    mod_two=StringField('BOH MOD: ')
    submit=SubmitField('Add')


#FLASK-FORM TO VALIDATE TACO TIMES DATA
class TacoForm(FlaskForm):
    location=SelectField('Location', choices=[
                                                ('183','North'),
                                                ('360','South'),
                                                ('Round Rock','Round Rock'),
                                                ('620','620'),
                                                ('Lamar','Lamar')
                                            ])
    date_measured_one=DateField('Date Measured', format='%Y-%m-%d')
    min_one=IntegerField('Min: ')
    sec_one=IntegerField('Sec: ')

    date_measured_two=DateField('Date Measured', format='%Y-%m-%d')
    min_two=IntegerField('Min: ')
    sec_two=IntegerField('Sec: ')

    date_measured_three=DateField('Date Measured', format='%Y-%m-%d')
    min_three=IntegerField('Min: ')
    sec_three=IntegerField('Sec: ')

    date_measured_four=DateField('Date Measured', format='%Y-%m-%d')
    min_four=IntegerField('Min: ')
    sec_four=IntegerField('Sec: ')

    date_measured_five=DateField('Date Measured', format='%Y-%m-%d')
    min_five=IntegerField('Min: ')
    sec_five=IntegerField('Sec: ')

    date_measured_six=DateField('Date Measured', format='%Y-%m-%d')
    min_six=IntegerField('Min: ')
    sec_six=IntegerField('Sec: ')

    date_measured_seven=DateField('Date Measured', format='%Y-%m-%d')
    min_seven=IntegerField('Min: ')
    sec_seven=IntegerField('Sec: ')

    submit=SubmitField('Add')


#FLASK-FORM TO VALIDATE BAG TIMES DATA
class BagTimesForm(FlaskForm):
    week_ending=DateField('Week Ending: ', format='%Y-%m-%d')
    location=SelectField('Location', choices=[
                                                ('MF1','MF1'),
                                                ('MF2','MF2'),
                                                ('MF3','MF3'),
                                                ('MF4','MF4'),
                                                ('Concept','Concept')
                                            ])
    week_avg=IntegerField('Week Average in Seconds: ')
    month_avg=IntegerField('Month Average in Seconds: ')
    quarter_avg=IntegerField('Quarter Average in Seconds: ')

    submit=SubmitField('Add')
