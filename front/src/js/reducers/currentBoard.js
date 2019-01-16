import { RECEIVE_BOARD } from '../actions/board'
import { RENAME_BOARD } from '../actions/board'


const initialState = {
  title: "",
  lists : []
}

export const currentBoard = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return {
        title: action.payload.board.title,
        lists: action.payload.board.lists
      }

    case RENAME_BOARD:
      return {
        title: action.payload.title,
        lists: state.lists
      }
    default:
      return state
  }
}
