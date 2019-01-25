from trello_light import db

class List(db.Model):
    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'))
    title = db.Column(db.String)
    cards = db.relationship('Card', backref='List', lazy=True, cascade='all, delete-orphan')
