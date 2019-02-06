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
                                content = 'Install Webpack',
                                description = ""
                            ),
                            Card(
                                content = 'Create components',
                                description = ""
                            )
                        ]
                    ),
                    List(
                        title = 'Current',
                        cards = [
                            Card(
                                content = 'Write models',
                                description = ""
                            )
                        ]
                    ),
                    List(
                        title = 'Done',
                        cards = [
                            Card(
                                content = 'Create Flask app',
                                description = ""
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
                                content = 'Fix pagination bug',
                                description = ""
                            ),
                            Card(
                                content = 'Clean code',
                                description = ""
                            )
                        ]
                    ),
                    List(
                        title = 'Current',
                        cards = [
                            Card(
                                content = 'Add total votes info',
                                description = ""
                            )
                        ]
                    ),
                    List(
                        title = 'Done',
                        cards = [
                            Card(
                                content = 'Display two new cats onclick',
                                description = ""
                            ),
                            Card(
                                content = 'Upgrade vote onclick',
                                description = ""
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
