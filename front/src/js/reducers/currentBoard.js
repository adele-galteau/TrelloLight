import { RECEIVE_BOARD, RENAME_BOARD, SHOW_BOARD_INPUT, HIDE_BOARD_INPUT } from '../actions/actionTypes'

const initialState = {
  title: ""
}

export const currentBoard = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return {
        title: action.payload.board.title,
        showInput: false
      }

    case RENAME_BOARD:
      return {
        title: action.payload.title,
        showInput: false
      }

    case SHOW_BOARD_INPUT:
      return {
        ...state,
        showInput: true
      }

    case HIDE_BOARD_INPUT: 
      return {
        ...state,
        showInput: false
      }
      
    default:
      return state
  }
}
