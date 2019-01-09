from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/trello_light.db'
app.config['SQLALCHEMY_ECHO'] = True
app.config['ENV'] = 'development'
app.config['DEBUG'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)
