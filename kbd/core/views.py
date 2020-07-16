from flask import current_app
from kbd.speed.models import CashierEfficiency
from kbd.speed.forms import CEForm, TacoForm
from kbd.sales.forms import SalesForm
from kbd.models import Users, FiscalCalendar
from kbd.core.forms import LoginForm
from kbd.clean.forms import InspForm
from kbd.clean.models import Inspections
from kbd.txh.models import GameFilm
from kbd.txh.forms import GFForm
from kbd.accuracy.models import ToGoLabel, OrderAccuracy
from kbd.accuracy.forms import TGLForm, OrderAccuracyForm
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
import pandas as pd
from flask_login import login_required

core = Blueprint('core',__name__)

@core.route('/')
def index():
    return render_template('index.html')

@core.route('/add')
#@login_required
def add():
    ceform=CEForm()
    sales_form=SalesForm()
    insp_form=InspForm()
    gf_form=GFForm()
    taco_form=TacoForm()
    tgl_form=TGLForm()
    acc_form=OrderAccuracyForm()

    return render_template('add.html',ceform=ceform, sales_form=sales_form, insp_form=insp_form, gf_form=gf_form, taco_form=taco_form, tgl_form=tgl_form, acc_form=acc_form)

@core.route('/c3js')
def c3():
    return render_template('c3js.html')

@core.route('/sales')
#@login_required
def sales():
    return render_template('/sales.html')

@core.route('/store_weekly')
#@login_required
def store_weekly():
    return render_template('store_weekly.html')

@core.route('/mf_kbds')
def mf_kbds():
    return render_template('mf_kbds.html')

@core.route('/rudys_kbds')
def rudys_kbds():
    return render_template('rudys_kbds.html')


@core.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('core.index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            return redirect(url_for('core.login'))
        login_user(user)
        return redirect(url_for('core.index'))
    return render_template('login.html', title='Sign In', form=form)

@core.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('core.index'))
