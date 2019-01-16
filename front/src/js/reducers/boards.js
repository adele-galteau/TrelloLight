import { RECEIVE_BOARDS, ADD_BOARD, REMOVE_BOARD } from '../actions/boards'
import { RENAME_BOARD } from '../actions/board'

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

    case RENAME_BOARD:
      return state.map(board => {
        if (board.id == action.payload.boardId) {
          board.title = action.payload.title
        }
        return board
      })

    default:
      return state
  }
}
