from flask_script import Command
from trello_light import app, db
from trello_light.models import *
import json

Users = [

]

class FixturesCommand(Command):
    def run(self):
        with app.app_context():
            for user in Users:
                db.session.add()
            db.session.commit()
