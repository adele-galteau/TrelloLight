import { RECEIVE_BOARD } from '../actions/board'
import { RENAME_BOARD } from '../actions/board'
import { ADD_LIST } from '../actions/lists'


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

    case ADD_LIST:
      return {
        title: state.title,
        lists: [
          ...state.lists,
          action.payload.list
        ]
      }
      
    default:
      return state
  }
}
