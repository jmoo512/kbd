from kbd import db
from datetime import datetime


class ToGoLabel(db.Model):
    __tablename__='tgl'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    fiscal_year=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    week_of_year=db.Column(db.Integer)
    quarter=db.Column(db.Integer)
    location=db.Column(db.String(15))
    date_measured=db.Column(db.Date)
    number_measured=db.Column(db.Integer)
    number_passed=db.Column(db.Integer)



class OrderAccuracy(db.Model):
    __tablename__='orderaccuracy'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    fiscal_year=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    week_of_year=db.Column(db.Integer)
    quarter=db.Column(db.Integer)
    location=db.Column(db.String(15))
    concept=db.Column(db.String(15))
    inaccurate_count=db.Column(db.Integer)
