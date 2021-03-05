from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email
from wtforms import ValidationError
from wtforms.fields.html5 import DateField

#FLASK-FORM TO VALIDATE SALES DATA
class SalesForm(FlaskForm):
    week_ending=DateField('Week Ending: ', format='%Y-%m-%d')
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
    fiscal_year=SelectField('Fiscal Year', choices=[
                                                        ('2020','2020'),
                                                        ('2019','2019'),
                                                        ('2018','2018')
                                                    ])
    week_of_month=SelectField('Week of Month', choices=[
                                                        ('1','1'),
                                                        ('2','2'),
                                                        ('3','3'),
                                                        ('4','4'),
                                                        ('5','5')
                                                ])

    week_of_year=IntegerField('Week of Year')

    concept=SelectField('Concept', choices=[
                                                ('Rudy\'s','Rudy\'s'),
                                                ('Mighty Fine','Mighty Fine')
                                                ])

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
    sales=FloatField('Sales')
    bbq_sales=FloatField('BBQ Sales')
    taco_sales=FloatField('Taco Sales')
    group_meal_sales=FloatField('Group Meal Sales')
    mavn_sales=FloatField('MAVN Sales')
    doordash_sales=FloatField('DoorDash Sales')
    total_guest_count=IntegerField('Total Guest Count')
    bbq_guest_count=IntegerField('BBQ Guest Count')
    taco_guest_count=IntegerField('Taco Guest Count')
    submit=SubmitField('Add')
