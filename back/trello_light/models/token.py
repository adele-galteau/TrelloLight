from trello_light import db, ma

class Token(db.Model):
    __tablename__ = 'token'

    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class TokenSchema(ma.ModelSchema):
    class Meta:
        model = Token
        fields = ('token',)

token_schema = TokenSchema()
tokens_schema = TokenSchema(many=True)
