from kbd import db
from datetime import datetime

class GameFilm(db.Model):
    __tablename__='gamefilm'
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
    type=db.Column(db.String(50))
    score=db.Column(db.Integer)
