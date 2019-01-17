import { RECEIVE_BOARD, RENAME_BOARD } from '../actions/board'
import { ADD_LIST, REMOVE_LIST, RENAME_LIST } from '../actions/lists'
import { ADD_CARD, REMOVE_CARD } from '../actions/cards'

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

    case REMOVE_LIST:
      return {
        title: state.title,
        lists: state.lists.filter(list => list.id != action.payload.listId)
      }

    case RENAME_LIST:
      return {
        title: state.title,
        lists: state.lists.map(list => {
          if (list.id == action.payload.listId) {
            list.title = action.payload.title
          }
          return list
        })
      }

      case ADD_CARD:
        return {
          title: state.title,
          lists:
            state.lists.map(list => {
              if (list.id == action.payload.listId) {
                list.cards = [
                  ...list.cards,
                  action.payload.card
                ]
              }
              return list
            })
        }

      case REMOVE_CARD:
        return {
          title: state.title,
          lists:
            state.lists.map(list => {
              if (list.id == action.payload.listId) {
                list.cards = list.cards.filter(card => card.id != action.payload.cardId)
              }
              return list
          })
        }


    default:
      return state
  }
}
