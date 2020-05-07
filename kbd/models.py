from kbd import db, login
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



class Users(UserMixin, db.Model):
    __tablename__='users'
    id=db.Column(db.Integer,primary_key=True)
    email=db.Column(db.String(50), unique=True)
    username=db.Column(db.String(20), unique=True)
    hashed_password=db.Column(db.String(256))

    def set_password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

@login.user_loader
def load_user(id):
    return Users.query.get(int(id))

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
