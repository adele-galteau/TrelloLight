from trello_light.models import Card, List, Board
from trello_light import app, db
from trello_light.schemas import card_schema, cards_schema
from .token import auth
from flask import jsonify, request, g


@app.route("/cards", methods=["GET"])
@auth
def get_cards():
    list_id = request.args.get("list_id")
    print("------------------>", list_id)

    list = List.query.filter_by(id=list_id).first()

    if not list:
        return "No such list for this id.", 404

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication.", 404

    cards = Card.query.filter_by(list_id=list.id).all()

    return cards_schema.jsonify(cards)


@app.route("/card", methods=["POST"])
@auth
def create_card():
    list_id = request.args.get("list_id")

    list = List.query.filter_by(id=list_id).first()

    if not list:
        return "No such list for this id.", 404

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication.", 404

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
        return "No such card for this id.", 404

    list = List.query.filter_by(id=card.list_id).first()

    if not list:
        return "No such card for this list or wrong authentication.", 404

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication", 404

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
        return "No such card for this id.", 404

    list = List.query.filter_by(id=card.list_id).first()

    if not list:
        return "No such card for this list or wrong authentication.", 404

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication.", 404

    db.session.delete(card)
    db.session.commit()

    return card_schema.jsonify(card)


@app.route("/card", methods=["PUT"])
@auth
def migrate_card():
    card_id = request.args.get("card_id")
    target_listId = request.args.get("target_listId")

    card = Card.query.filter_by(id=card_id).first()

    if not card:
        return "No card for this id", 404

    home_list = List.query.filter_by(id=card.list_id).first()

    if not home_list:
        return "No such card for this list or wrong authentication", 404

    board = Board.query.filter_by(id=home_list.board_id).first()

    if not board:
        return "No such list for this board or wrong authentication.", 404

    target_list = List.query.filter_by(id=target_listId, board_id=home_list.board_id).first()

    if not target_list:
        return "No target list for this id or board", 404

    card.list_id = target_list.id

    db.session.add(card)
    db.session.commit()

    return card_schema.jsonify(card)
