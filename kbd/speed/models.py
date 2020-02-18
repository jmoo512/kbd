from kbd import db
from datetime import datetime

class CashierEfficiency(db.Model):
    __tablename__='ce'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    tm_name=db.Column(db.String(50))
    tm_sales=db.Column(db.Float)
    tm_minutes=db.Column(db.Integer)
    tm_efficiency=db.Column(db.Float)

    def __init__(self, week_ending, fiscal_week, location, date_measured, tm_name, tm_sales, tm_minutes, tm_efficiency):
        self.week_ending=week_ending
        self.fiscal_week=fiscal_week
        self.location=location
        self.date_measured=date_measured
        self.tm_name=tm_name
        self.tm_sales=tm_sales
        self.tm_minutes=tm_minutes
        self.tm_efficiency=tm_efficiency

class GMTimes(db.Model):
    __tablename__='gmtimes'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    time_measure=db.Column(db.DateTime(40))
    order_type=db.Column(db.String(20))
    score=db.Column(db.Integer)
    paid=db.Column(db.Boolean)

class LineTimes(db.Model):
    __tablename__='linetimes'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    am_taken=db.Column(db.Integer)
    am_out=db.Column(db.Integer)
    am_over_11=db.Column(db.Integer)
    pm_taken=db.Column(db.Integer)
    pm_out=db.Column(db.Integer)
    pm_over_11=db.Column(db.Integer)

class TacoTimes(db.Model):
    __tablename__='tacotimes'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    time_measure=db.Column(db.DateTime(40))
    score=db.Column(db.DateTime(40))

class BagTimes(db.Model):
    __tablename__='bagtimes'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    month_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    location=db.Column(db.String(20))
    fiscal_week=db.Column(db.Integer)
    score=db.Column(db.DateTime(40))
    score_met=db.Column(db.Float)
