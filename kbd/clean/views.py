from flask import current_app
from flask_login import login_required
from kbd import db
from .models import Inspections
from .forms import InspForm
from flask import render_template,Blueprint,redirect,url_for

clean=Blueprint('clean',__name__)


@clean.route('/clean_add/',methods=['POST'])
#@login_required
def clean_add():

    form=InspForm()

    insp=Inspections(
            week_ending=form.week_ending.data,
            location=form.location.data,
            date_measured=form.date_measured.data,
            score=form.score.data,
            concept=form.concept.data,
            fiscal_month=form.fiscal_month.data,
            fiscal_year=form.fiscal_year.data,
            week_of_month=form.week_of_month.data,
            week_of_year=form.week_of_year.data
        )
    db.session.add(insp)
    db.session.commit()

    return redirect(url_for('core.add'))
