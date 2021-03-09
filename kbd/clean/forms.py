from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email
from wtforms import ValidationError
from wtforms.fields.html5 import DateField


#FLASK-FORM TO VALIDATE INSPECTION DATA

class InspForm(FlaskForm):
    week_ending=DateField('Week Ending: ', format='%Y-%m-%d')
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

    quarter=SelectField('Quarter', choices=[
                                                        ('1','1'),
                                                        ('2','2'),
                                                        ('3','3'),
                                                        ('4','4')
                                                ])

    concept=SelectField('Concept', choices=[
                                                ('Concept A','Concept A\'s'),
                                                ('Concept B','Concept B')
                                                ])

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
    date_measured=DateField('Date of Inspection', format='%Y-%m-%d')
    score=FloatField('Score')
    submit=SubmitField('Add')