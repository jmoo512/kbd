from flask import current_app
from kbd import db
from .models import Sales
from .forms import SalesForm
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify




sales=Blueprint('sales',__name__)

@sales.route('/add/',methods=['POST'])
def add():

    form=SalesForm()

    sales=Sales(
            week_ending=form.week_ending.data,
            fiscal_month=form.fiscal_month.data,
            fiscal_year=form.fiscal_year.data,
            week_of_month=form.week_of_month.data,
            week_of_year=form.week_of_year.data,
            concept=form.concept.data,
            location=form.location.data,
            sales=form.sales.data,
            bbq_sales=form.bbq_sales.data,
            taco_sales=form.taco_sales.data,
            group_meal_sales=form.group_meal_sales.data,
            mavn_sales=form.mavn_sales.data,
            doordash_sales=form.doordash_sales.data,
            total_guest_count=form.total_guest_count.data,
            bbq_guest_count=form.bbq_guest_count.data,
            taco_guest_count=form.taco_guest_count.data
        )
    db.session.add(sales)
    db.session.commit()

    return redirect(url_for('core.add'))
