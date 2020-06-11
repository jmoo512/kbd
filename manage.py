from flask import Flask
from kbd import create_app
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from kbd import db
from kbd.speed import models
from kbd.sales import models
from kbd.txh import models

#Migrate(app,db)

manager=Manager(create_app)
manager.add_command('db',MigrateCommand)

if __name__=='__main__':
    manager.run()
