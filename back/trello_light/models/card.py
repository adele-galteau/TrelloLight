from trello_light import db, ma

class Card(db.Model):
    __tablename__ = 'card'

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
    content = db.Column(db.String(80))

class CardSchema(ma.ModelSchema):
    class Meta:
        model = Card

card_schema = CardSchema()
cards_schema = CardSchema(many=True)
