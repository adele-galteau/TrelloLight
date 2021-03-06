from trello_light.models import Card, List, Board
from trello_light import app, db
from trello_light.schemas import card_schema, cards_schema
from .token import auth
from flask import jsonify, request, g


@app.route("/api/cards", methods=["GET"])
@auth
def get_cards():
    board_id = request.args.get("board_id")

    board = Board.query.filter_by(user_id=g.user, id=board_id).first()

    if not board:
        return "No such board for this id or wrong authentication.", 404

    lists = List.query.filter_by(board_id=board.id).all()

    lists_ids = []

    for list in lists:
        lists_ids.append(list.id)

    cards = Card.query.filter(Card.list_id.in_(lists_ids)).all()

    return cards_schema.jsonify(cards)


@app.route("/api/card", methods=["POST"])
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



@app.route("/api/card/<card_id>", methods=["PUT"])
@auth
def modify_card(card_id):
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

    if result.data.content != None:
        card.content = result.data.content
    else:
        card.content = card.content

    if result.data.description != None:
        card.description = result.data.description
    else:
        card.description = card.description
    

    db.session.add(card)
    db.session.commit()

    return card_schema.jsonify(card)


@app.route("/api/card/<card_id>", methods=["DELETE"])
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


@app.route("/api/card", methods=["PUT"])
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
