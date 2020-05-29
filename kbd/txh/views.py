from flask import current_app
from flask_login import login_required
from kbd import db
#from .models import Inspections
#from .forms import InspForm
from flask import render_template,Blueprint,redirect,url_for,jsonify,Response
import pandas as pd
from psql_config import config
import psycopg2

params=config()


txh=Blueprint('txh',__name__)
