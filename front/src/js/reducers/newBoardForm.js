import { SHOW_NEW_BOARD_FORM, HIDE_NEW_BOARD_FORM } from "../actions/actionTypes";

const initialState = {
  show: false
}

export const newBoardForm = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NEW_BOARD_FORM:
      return {
        show: true
      }

    case HIDE_NEW_BOARD_FORM:
      return {
        show: false
      }
    
    default:
      return state
    }
}