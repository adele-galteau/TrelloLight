from trello_light import db

class Token(db.Model):
    __tablename__ = 'token'

    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
