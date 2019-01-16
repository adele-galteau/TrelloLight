import { RECEIVE_BOARDS } from '../actions/boards'

export const boards = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOARDS:
      return action.payload.boards

    default:
      return state
  }
}
