from trello_light.models import User, Token
from trello_light import app, db
from trello_light.schemas import user_schema, users_schema,token_schema, tokens_schema
from flask import jsonify, request, g
import uuid

def auth(fn):
    def f(**kwargs):
        t_str = request.headers.get('X-Authenticate', '')

        t = Token.query.filter_by(token=t_str).first()

        if not t:
            return "Wrong authentication.", 401

        g.user = t.user_id

        return fn(**kwargs)

    f.__name__ = fn.__name__

    return f


@app.route("/token", methods=["GET"])
def get_token():
    t_str = request.headers.get('X-Authenticate', '')
    t = Token.query.filter_by(token=t_str).first()

    if not t:
        return "Wrong authentication.", 401

    return "", 200


@app.route("/login", methods=["POST"])
def login():
    result = user_schema.load(request.json, session=db.session)

    if len(result.errors) > 0:
        return jsonify(result.errors)

    user = User.query.filter_by(username=result.data.username, password=result.data.password).first()

    if not user:
        return "Wrong username or password.", 404

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

    for token in tokens:
        db.session.delete(token)

    db.session.commit()

    return ""
