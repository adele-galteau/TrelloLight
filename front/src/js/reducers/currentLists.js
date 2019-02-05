import { RECEIVE_BOARD, ADD_LIST, REMOVE_LIST, RENAME_LIST } from '../actions/actionTypes'

const initialState = []

export const currentLists = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return action.payload.board.lists.map(list => {
          return {
            title: list.title,
            id: list.id
          }
        })

    case ADD_LIST:
      return [
        ...state,
        {
          title: action.payload.list.title,
          id: action.payload.list.id
        }
      ]

    case REMOVE_LIST:
      return state.filter(list => list.id != action.payload.listId)

    case RENAME_LIST:
      return state.map(list => {
        if (list.id == action.payload.listId) {
          list.title = action.payload.title
        }
        return list
      })

    default:
      return state
  }
}
