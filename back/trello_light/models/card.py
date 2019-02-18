from trello_light import db

class Card(db.Model):
    __tablename__ = 'card'

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
    content = db.Column(db.String(80))
    description = db.Column(db.String)
