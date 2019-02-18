import { RECEIVE_CARDS, ADD_CARD, REMOVE_CARD, RENAME_CARD, MIGRATE_CARD, EDIT_CARD_DESCRIPTION } from '../actions/actionTypes'

const initialState = []

export const currentCards = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CARDS:
      return action.payload.cards

    case ADD_CARD:
      return [
        ...state,
        action.payload.card
      ]

    case RENAME_CARD:
      return state.map(card => {
        if (card.id == action.payload.cardId) {
          card.content = action.payload.content
        }
        return card
      })

    case EDIT_CARD_DESCRIPTION:
      return state.map(card => {
        if (card.id == action.payload.cardId) {
          card.description = action.payload.description
        }
        return card
      })

    case REMOVE_CARD:
      return state.filter(card => card.id != action.payload.cardId)


    case MIGRATE_CARD:
      return state.map(card => {
        if (card.id == action.payload.cardId) {
          card.List = action.payload.targetListId
        }
        return card
      })
      return
    default:
      return state
  }
}
