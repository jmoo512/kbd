import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_login import LoginManager
from flask_cors import CORS
#from flask_praetorian import Praetorian
from config import Config

APP_ROOT = os.path.abspath(os.path.dirname(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')

db = SQLAlchemy()
migrate = Migrate()
login=LoginManager()
login.login_view = 'core.login'
#guard=Praetorian()
cors=CORS()

def create_app(config_class=Config):

    app = Flask(__name__)

    db.init_app(app)
    migrate.init_app(app,db)
    login.init_app(app)
    cors.init_app(app)




    app.config.from_object(config_class)

    with app.app_context():


        #import blueprints
        from kbd.core.views import core
        from kbd.speed.views import speed
        from kbd.sales.views import sales
        from kbd.clean.views import clean
        from kbd.txh.views import txh
        #register blueprints
        app.register_blueprint(core)
        app.register_blueprint(speed)
        app.register_blueprint(sales)
        app.register_blueprint(clean)
        app.register_blueprint(txh)



        return app



#config switching

#if app.config['ENV']=='development':
#    app.config.from_object('config.DevelopmentgConfig')

#elif app.config['ENV']=='staging':
#    app.config.from_object('config.StagingConfig')

#else:
#    app.config.from_object('config.ProductionConfig')
