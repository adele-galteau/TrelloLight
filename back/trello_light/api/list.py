from trello_light.models import List, list_schema, lists_schema, Board
from trello_light import app, db
from .token import auth
from flask import jsonify, request, g


@app.route("/lists/<board_id>", methods=["GET"])
@auth
def get_lists(board_id):
    board = Board.query.filter_by(user_id=g.user, id=board_id).first()

    if not board:
        return "No board for this id", 404

    lists = List.query.filter_by(board_id=board.id).all()

    return lists_schema.jsonify(lists)



@app.route("/list/<board_id>", methods=["POST"])
@auth
def create_list(board_id):
    board = Board.query.filter_by(user_id=g.user, id=board_id).first()

    if not board:
        return "Wrong authentication", 401

    result = list_schema.load(request.json)

    if len(result.errors) > 0:
        return jsonify(result.errors)

    result.data.board_id = board.id

    db.session.add(result.data)
    db.session.commit()

    return list_schema.jsonify(result.data)



@app.route("/list/<list_id>", methods=["PUT"])
@auth
def modify_list_title(list_id):
    list = List.query.filter_by(id=list_id).first()

    if not list:
        return "No list for this id or user"

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No list for this board or wrong authentication", 404

    result = list_schema.load(request.json)

    list.title = result.data.title

    db.session.add(list)
    db.session.commit()

    return list_schema.jsonify(list)



@app.route("/list/<list_id>", methods=["DELETE"])
@auth
def delete_list(list_id):
    list = List.query.filter_by(id=list_id).first()

    if not list:
        return "No list for this id or user"

    board = Board.query.filter_by(user_id=g.user, id=list.board_id).first()

    if not board:
        return "No list for this board or wrong authentication", 404

    db.session.delete(list)
    db.session.commit()

    return ""
