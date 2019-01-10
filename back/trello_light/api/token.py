from trello_light.models import User, user_schema, users_schema, Token, token_schema, tokens_schema
from trello_light import app, db
from flask import jsonify, request, g
import uuid

def auth(fn):
    def f(**kwargs):
        t_str = request.headers.get('X-Authenticate', '')

        t = Token.query.filter_by(token=t_str).first()

        if not t:
            return "Wrong authentication", 401

        g.user = t.user_id

        return fn(**kwargs)

    f.__name__ = fn.__name__

    return f

@app.route("/login", methods=["POST"])
def login():
    result = user_schema.load(request.json, session=db.session)

    if len(result.errors) > 0:
        return jsonify(result.errors)

    user = User.query.filter_by(username=result.data.username, password=result.data.password).first()

    if not user:
        return "Wrong username or password.", 401

    token = Token(
        token = str(uuid.uuid4()),
        user_id = user.id
    )

    db.session.add(token)
    db.session.commit()

    return token_schema.jsonify(token)


@app.route("/logout", methods=["DELETE"])
@auth
def logout():

    tokens = Token.query.filter_by(user_id=g.user).all()

    if len(tokens) <= 0:
        return "No token for this user", 401

    for token in tokens:
        db.session.delete(token)

    db.session.commit()

    return ""
