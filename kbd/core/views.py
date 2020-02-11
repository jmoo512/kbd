from kbd import app, APP_STATIC
from flask import render_template,request,Blueprint,redirect,url_for, request, jsonify
from werkzeug import secure_filename
import pandas as pd
import os

core = Blueprint('core',__name__)

@core.route('/')
def index():
    return render_template('index.html')

@core.route('/sales')
def sales():
    df=pd.read_csv(os.path.join(APP_STATIC, 'sales.csv'))
    df.reset_index()
    #df.drop(['week_ending','month','week_of_month','week_of_year','concept','group_meal','guest_count'],axis=1,inplace=True)
    #df.groupby(['sales']).sum()

    df = df.to_json()

    return jsonify(df)
