from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_env import MetaFlaskEnv

class Configuration(object):
    __metaclass__ = MetaFlaskEnv
    
    SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/trello_light.db'
    DEBUG = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True

app = Flask(__name__)
CORS(app)

app.config.from_object(Configuration)

db = SQLAlchemy(app)
ma = Marshmallow(app)
