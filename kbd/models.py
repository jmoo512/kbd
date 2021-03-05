from kbd import db, login
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


#USERS DB MODEL FOR LOGIN
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




#FOOD VARIANCE DB MODEL
class FoodVariance(db.Model):
    __tablename__='foodvariance'
    id=db.Column(db.Integer,primary_key=True)
    month_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    location=db.Column(db.String(20))
    score=db.Column(db.Float)

#STORE ASSESSMENT DB MODEL
class StoreAssessments(db.Model):
    __tablename__='storeassessments'
    id=db.Column(db.Integer,primary_key=True)
    month_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    location=db.Column(db.String(20))
    score=db.Column(db.Float)


#FISCAL CALENDAR DB MODEL
class FiscalCalendar(db.Model):
    __tablename__='fiscalcalendar'
    id=db.Column(db.Integer,primary_key=True)
    date=db.Column(db.Date)
    week_ending=db.Column(db.Date)
    fiscal_year=db.Column(db.Integer)
    fiscal_quarter=db.Column(db.Integer)
    fiscal_month=db.Column(db.String(20))
    fiscal_week=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    day_of_week=db.Column(db.String(15))
