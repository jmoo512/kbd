from kbd import db
from datetime import datetime


class ToGoLabel(db.Model):
    __tablename__='tgl'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    time_measure=db.Column(db.DateTime(40))
    tm_name=db.Column(db.String(50))
    score=db.Column(db.String(25))



class OrderAccuracy(db.Model):
    __tablename__='orderaccuracy'
    id=db.Column(db.Integer,primary_key=True)
    month_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    location=db.Column(db.String(20))
    score=db.Column(db.Float)
