from flask import current_app
from flask_login import login_required
from kbd import db
from kbd.models import FiscalCalendar
#from .models import
#from .forms import
from flask import render_template,Blueprint,redirect,url_for,jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()

accuracy=Blueprint('accuracy',__name__)
