from trello_light import db, ma
from marshmallow import fields
from .card import CardSchema

class List(db.Model):
    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'))
    title = db.Column(db.String)
    cards = db.relationship('Card', backref='List', lazy=True, cascade='all, delete-orphan')

class ListSchema(ma.ModelSchema):
    class Meta:
        model = List

class ListsSchema(ma.ModelSchema):
    class Meta:
        model = List
        fields = ("id", "title", "cards")
    cards = fields.Nested(CardSchema, many=True)

list_schema = ListSchema()
lists_schema = ListsSchema(many=True)
