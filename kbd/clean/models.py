from kbd import db


class Inspections(db.Model):
    __tablename__='inspections'
    id=db.Column(db.Integer,primary_key=True)
    week_ending=db.Column(db.Date)
    fiscal_month=db.Column(db.String(20))
    fiscal_year=db.Column(db.Integer)
    week_of_month=db.Column(db.Integer)
    week_of_year=db.Column(db.Integer)
    concept=db.Column(db.String(15))
    location=db.Column(db.String(15))
    date_measured=db.Column(db.Date)
    score=db.Column(db.Float)
