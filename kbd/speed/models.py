from kbd import db
from datetime import datetime


#CASHIER EFFICIENCY DB MODEL

class CashierEfficiency(db.Model):
    __tablename__='ce'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    fiscal_month=db.Column(db.String(20))
    fiscal_year=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    tm_name=db.Column(db.String(50))
    tm_sales=db.Column(db.Float)
    tm_minutes=db.Column(db.Integer)
    tm_efficiency=db.Column(db.Float)
    mod_one=db.Column(db.String(50))
    mod_two=db.Column(db.String(50))

    def __init__(self, week_ending, fiscal_week, fiscal_month, fiscal_year, week_of_month, location, date_measured, tm_name, tm_sales, tm_minutes, tm_efficiency, mod_one, mod_two):
        self.week_ending=week_ending
        self.fiscal_week=fiscal_week
        self.fiscal_month=fiscal_month
        self.fiscal_year=fiscal_year
        self.week_of_month=week_of_month
        self.location=location
        self.date_measured=date_measured
        self.tm_name=tm_name
        self.tm_sales=tm_sales
        self.tm_minutes=tm_minutes
        self.tm_efficiency=tm_efficiency
        self.mod_one=mod_one
        self.mod_two=mod_two

#GROUP MEAL TIMES DB MODEL

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


#LINE TIMES DB MODEL

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

#TACO TIMES DB MODEL

class TacoTimes(db.Model):
    __tablename__='tacotimes'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    fiscal_year=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    week_of_year=db.Column(db.Integer)
    quarter=db.Column(db.Integer)
    concept=db.Column(db.String(20))
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    score=db.Column(db.DateTime(40))
    time_in_seconds=db.Column(db.Integer)

#BAG TIMES DB MODEL

class BagTimes(db.Model):
    __tablename__='bagtimes'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    fiscal_year=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    week_of_year=db.Column(db.Integer)
    quarter=db.Column(db.Integer)
    location=db.Column(db.String(20))
    week_avg=db.Column(db.Integer)
    month_avg=db.Column(db.Integer)
    quarter_avg=db.Column(db.Integer)
