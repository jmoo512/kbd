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

    def __init__(self,title,text,related_deck,related_box,related_card):
        self.title=title
        self.text=text
        self.related_deck=related_deck
        self.related_box=related_box
        self.related_card=related_card

class GameFilm(db.Model):
    __tablename__='gamefilm'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    tm_name=db.Column(db.String(50))
    score=db.Column(db.Integer)

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

class FoodVariance(db.Model):
    __tablename__='foodvariance'
    id=db.Column(db.Integer,primary_key=True)
    month_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    location=db.Column(db.String(20))
    score=db.Column(db.Float)

class Inspections(db.Model):
    __tablename__='inspections'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    time_measure=db.Column(db.DateTime(40))
    score=db.Column(db.Float)

class StoreAssessments(db.Model):
    __tablename__='storeassessments'
    id=db.Column(db.Integer,primary_key=True)
    month_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    location=db.Column(db.String(20))
    score=db.Column(db.Float)

class OrderAccuracy(db.Model):
    __tablename__='orderaccuracy'
    id=db.Column(db.Integer,primary_key=True)
    month_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    location=db.Column(db.String(20))
    score=db.Column(db.Float)
