from trello_light import ma
from .models import *
from marshmallow import fields


class CardSchema(ma.ModelSchema):
    class Meta:
        model = Card

class ListSchema(ma.ModelSchema):
    class Meta:
        model = List

class ListsSchema(ma.ModelSchema):
    class Meta:
        model = List
        fields = ("id", "title")

class NestedBoardSchema(ma.ModelSchema):
    class Meta:
        model = Board
        fields = ("id", "title", "lists")
    lists = fields.Nested(ListsSchema, many=True)

class BoardSchema(ma.ModelSchema):
    class Meta:
        model = Board
        fields = ("id", "title")


class TokenSchema(ma.ModelSchema):
    class Meta:
        model = Token
        fields = ('token',)

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User


card_schema = CardSchema()
cards_schema = CardSchema(many=True)
list_schema = ListSchema()
lists_schema = ListsSchema(many=True)
nestedBoard_schema = NestedBoardSchema()
board_schema = BoardSchema()
boards_schema = BoardSchema(many=True)
token_schema = TokenSchema()
tokens_schema = TokenSchema(many=True)
user_schema = UserSchema()
users_schema = UserSchema(many=True)
