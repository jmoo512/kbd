import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_login import LoginManager
from config import Config

APP_ROOT = os.path.abspath(os.path.dirname(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')

db = SQLAlchemy()
migrate = Migrate()
login=LoginManager()
login.login_view = 'core.login'

def create_app(config_class=Config):

    app = Flask(__name__)

    db.init_app(app)
    migrate.init_app(app,db)
    login.init_app(app)




    app.config.from_object(config_class)

    with app.app_context():


        #import blueprints
        from kbd.core.views import core
        from kbd.speed.views import speed
        from kbd.sales.views import sales
        #register blueprints
        app.register_blueprint(core)
        app.register_blueprint(speed)
        app.register_blueprint(sales)



        return app



#config switching

#if app.config['ENV']=='development':
#    app.config.from_object('config.DevelopmentgConfig')

#elif app.config['ENV']=='staging':
#    app.config.from_object('config.StagingConfig')

#else:
#    app.config.from_object('config.ProductionConfig')

#db = SQLAlchemy(app)
#Migrate(app,db)

#import blueprints
#from kbd.core.views import core
#from kbd.speed.views import speed


#register blueprints
#app.register_blueprint(core)
#app.register_blueprint(speed)
