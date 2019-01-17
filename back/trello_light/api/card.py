from trello_light.models import Card, card_schema, cards_schema, List, Board
from trello_light import app, db
from .token import auth
from flask import jsonify, request, g


@app.route("/cards/<list_id>", methods=["GET"])
@auth
def get_cards(list_id):
    list = List.query.filter_by(id=list_id).first()

    if not list:
        return "No list for this id", 404

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication", 401

    cards = Card.query.filter_by(list_id=list.id).all()

    return cards_schema.jsonify(cards)


@app.route("/card/<list_id>", methods=["POST"])
@auth
def create_card(list_id):
    list = List.query.filter_by(id=list_id).first()

    if not list:
        return "No list for this id", 404

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication", 401

    result = card_schema.load(request.json)

    if len(result.errors) > 0:
        return jsonify(result.errors)

    result.data.list_id = list.id

    db.session.add(result.data)
    db.session.commit()

    return card_schema.jsonify(result.data)



@app.route("/card/<card_id>", methods=["PUT"])
@auth
def modify_card_content(card_id):
    card = Card.query.filter_by(id=card_id).first()

    if not card:
        return "No card for this id", 404

    list = List.query.filter_by(id=card.list_id).first()

    if not list:
        return "No such card for this list or wrong authentication", 401

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication", 401

    result = card_schema.load(request.json)

    if len(result.errors) > 0:
        return jsonify(result.errors)

    card.content = result.data.content

    db.session.add(card)
    db.session.commit()

    return card_schema.jsonify(card)


@app.route("/card/<card_id>", methods=["DELETE"])
@auth
def delete_card(card_id):
    card = Card.query.filter_by(id=card_id).first()

    if not card:
        return "No card for this id", 404

    list = List.query.filter_by(id=card.list_id).first()

    if not list:
        return "No such card for this list or wrong authentication", 401

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication", 401

    db.session.delete(card)
    db.session.commit()

    return card_schema.jsonify(card)
