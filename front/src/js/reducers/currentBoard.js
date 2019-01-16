import { RECEIVE_BOARD } from '../actions/board'

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

    default:
      return state
  }
}
