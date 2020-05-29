from kbd import db
from datetime import datetime

class GameFilm(db.Model):
    __tablename__='gamefilm'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_week=db.Column(db.Integer)
    location=db.Column(db.String(20))
    date_measured=db.Column(db.Date)
    tm_name=db.Column(db.String(50))
    score=db.Column(db.Integer)
