from trello_light import db, ma

class Board(db.Model):
    __tablename__ = 'board'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(80))
    lists = db.relationship('List', backref='board', lazy=True, cascade='all, delete-orphan')

class BoardSchema(ma.ModelSchema):
    class Meta:
        model = Board

board_schema = BoardSchema()
boards_schema = BoardSchema(many=True)
