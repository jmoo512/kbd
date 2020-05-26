from kbd import db
from datetime import datetime


class Inspections(db.Model):
    __tablename__='inspections'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    fiscal_year=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    week_of_year=db.Column(db.Integer)
    quarter=db.Column(db.Integer)
    concept=db.Column(db.String(15))
    location=db.Column(db.String(15))
    date_measured=db.Column(db.Date)
    score=db.Column(db.Float)

    def __init__(self, week_ending, fiscal_month, fiscal_year, week_of_month, week_of_year, concept, location, date_measured, score):
        self.week_ending=week_ending
        self.fiscal_month=fiscal_month
        self.fiscal_year=fiscal_year
        self.week_of_month=week_of_month
        self.week_of_year=week_of_year
        self.concept=concept
        self.location=location
        self.date_measured=date_measured
        self.score=score
