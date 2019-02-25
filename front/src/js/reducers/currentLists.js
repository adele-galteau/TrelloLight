import { RECEIVE_BOARD, ADD_LIST, REMOVE_LIST, RENAME_LIST, SHOW_LIST_INPUT, HIDE_LIST_INPUT, SHOW_NEW_CARD_INPUT, HIDE_NEW_CARD_INPUT } from '../actions/actionTypes'

const initialState = []

export const currentLists = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOARD:
      return action.payload.board.lists.map(list => {
          return {
            title: list.title,
            id: list.id,
            showInput: false,
            showNewCardInput: false
          }
        })

    case ADD_LIST:
      return [
        ...state,
        {
          title: action.payload.list.title,
          id: action.payload.list.id,
          showInput: false,
          showNewCardInput: false
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

    case SHOW_LIST_INPUT:
      return state.map(list => {
        if (list.id == action.payload.listId) {
          list.showInput = true
        } else {
          list.showInput = false
        }
        return list
      })

    case HIDE_LIST_INPUT:
      return state.map(list => {
        list.showInput = false
        return list
      })

    case SHOW_NEW_CARD_INPUT:
      return state.map(list => {
        if (list.id == action.payload.listId) {
          list.showNewCardInput = true
        } else {
          list.showNewCardInput = false
        }
        return list
      })

    case HIDE_NEW_CARD_INPUT:
      return state.map(list => {
        list.showNewCardInput = false
        return list
      })

    default:
      return state
  }
}
