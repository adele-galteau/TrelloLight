from trello_light.models import Board, board_schema, boards_schema
from trello_light import app, db
from .token import auth
from flask import jsonify, request, g


@app.route("/boards", methods=["GET"])
@auth
def get_boards():
    boards = Board.query.filter_by(user_id=g.user).all()

    return boards_schema.jsonify(boards)


@app.route("/board/<id>", methods=["GET"])
@auth
def get_board(id):
    board = Board.query.filter_by(user_id=g.user, id=id).first()

    if not board:
        return "No board for this id or user", 404

    return board_schema.jsonify(board)


@app.route("/board", methods=["POST"])
@auth
def create_board():
    result = board_schema.load(request.json)

    if len(result.errors) > 0:
        return jsonify(result.errors)

    result.data.user_id = g.user

    db.session.add(result.data)
    db.session.commit()

    return board_schema.jsonify(result.data)


@app.route("/board/<id>", methods=["PUT"])
@auth
def modify_board_title(id):
    board = Board.query.filter_by(user_id=g.user, id=id).first()

    if not board:
        return "No board for this id or user", 404

    result = board_schema.load(request.json)

    if len(result.errors) > 0:
        return jsonify(result.errors)

    board.title = result.data.title

    db.session.add(board)
    db.session.commit()

    return board_schema.jsonify(board)


@app.route("/board/<id>", methods=["DELETE"])
@auth
def delete_board(id):
    board = Board.query.filter_by(user_id=g.user, id=id).first()

    if not board:
        return "No board for this id or user", 404

    db.session.delete(board)
    db.session.commit()

    return board_schema.jsonify(board)
