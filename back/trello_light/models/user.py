from trello_light import db, ma

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))
    token = db.relationship('Token', backref='user', lazy=True)
    boards = db.relationship('Board', backref='user', lazy=True, cascade='all, delete-orphan')

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

user_schema = UserSchema()
users_schema = UserSchema(many=True)
