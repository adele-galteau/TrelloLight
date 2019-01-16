from trello_light import db, ma
from marshmallow import fields
from .list import ListsSchema

class Board(db.Model):
    __tablename__ = 'board'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(80))
    lists = db.relationship('List', backref='board', lazy=True, cascade='all, delete-orphan')

class NestedBoardSchema(ma.ModelSchema):
    class Meta:
        model = Board
        fields = ("id", "title", "lists")
    lists = fields.Nested(ListsSchema, many=True)

class BoardSchema(ma.ModelSchema):
    class Meta:
        model = Board
        fields = ("id", "title")

nestedBoard_schema = NestedBoardSchema()
board_schema = BoardSchema()
boards_schema = BoardSchema(many=True)
