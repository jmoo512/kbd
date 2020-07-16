from flask_wtf import FlaskForm
from wtforms import validators, StringField, SelectField, IntegerField, FloatField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email
from wtforms import ValidationError
from wtforms.fields.html5 import DateField

class GFForm(FlaskForm):
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
                                                ('Rudys','Rudy\'s'),
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
    date_measured=DateField('Date of Game Film', format='%Y-%m-%d')

    type=SelectField('Game Film Type', choices=[
                                                ('MF','MF'),
                                                ('MF Phone','MF Phone'),
                                                ('MF Pickup','MF Pickup'),
                                                ('Rudys Phone','Rudys Phone'),
                                                ('Rudys Pick Up','Rudys Pick Up')
                                                ])
    score=FloatField('Score')
    submit=SubmitField('Add')
