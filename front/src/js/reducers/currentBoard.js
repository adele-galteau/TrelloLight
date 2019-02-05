import { RECEIVE_BOARD, RENAME_BOARD } from '../actions/actionTypes'

const initialState = {
  title: ""
}

export const currentBoard = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return {
        title: action.payload.board.title
      }

    case RENAME_BOARD:
      return {
        title: action.payload.title
      }
      
    default:
      return state
  }
}
