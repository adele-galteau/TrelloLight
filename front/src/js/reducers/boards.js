import { RECEIVE_BOARDS, ADD_BOARD, REMOVE_BOARD } from '../actions/boards'

export const boards = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOARDS:
      return action.payload.boards

    case ADD_BOARD:
      return [
        ...state,
        action.payload.board
      ]

    case REMOVE_BOARD:
      return state.filter(board => board.id != action.payload.boardId)

    default:
      return state
  }
}
