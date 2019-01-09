from flask_script import Command
from trello_light import app, db
from trello_light.models import *
import json

datas = [
    User(
        username = 'simon',
        password = 'simon_pass',
        token = [
            Token(
                token = '1234'
            )
        ],
        boards = [
            Board(
                title = 'Py_todo App',
                lists = [
                    List(
                        title = 'Backlog',
                        cards = [
                            Card(
                                content = 'Install Webpack'
                            ),
                            Card(
                                content = 'Create components'
                            )
                        ]
                    ),
                    List(
                        title = 'Current',
                        cards = [
                            Card(
                                content = 'Write models'
                            )
                        ]
                    ),
                    List(
                        title = 'Done',
                        cards = [
                            Card(
                                content = 'Create Flask app'
                            )
                        ]
                    )
                ]
            )
        ]
    ),

    User(
        username = 'spencer',
        password = 'spencer_pass',
        token = [
            Token(
                token = '5678'
            )
        ],
        boards = [
            Board(
                title = 'CatMash App',
                lists = [
                    List(
                        title = 'Backlog',
                        cards = [
                            Card(
                                content = 'Fix pagination bug'
                            ),
                            Card(
                                content = 'Clean code'
                            )
                        ]
                    ),
                    List(
                        title = 'Current',
                        cards = [
                            Card(
                                content = 'Add total votes info'
                            )
                        ]
                    ),
                    List(
                        title = 'Done',
                        cards = [
                            Card(
                                content = 'Display two new cats onclick'
                            ),
                            Card(
                                content = 'Upgrade vote onclick'
                            )
                        ]
                    )
                ]
            )
        ]
    )
]


class FixturesCommand(Command):
    def run(self):
        with app.app_context():

            for user in datas:
                db.session.add(user)

            db.session.commit()
