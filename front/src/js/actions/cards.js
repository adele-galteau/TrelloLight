import { api } from './api'
import { replace } from 'connected-react-router'
import * as action from './actionCreators'

export function fetchAddCard(content, listId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.addCard(content, listId)
        .then(card => {
          dispatch(action.addCard(card, listId))
        })

        .catch(() => {
          dispatch(replace('/login'))
          api.removeToken()
        })
    }
  }
}

export function fetchRemoveCard(cardId, listId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.removeCard(cardId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.removeCard(cardId, listId))
    }
  }
}

export function fetchRenameCard(content, cardId, listId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.renameCard(content, cardId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.renameCard(content, cardId, listId))
    }
  }
}

export function fetchMigrateCard(cardId, targetListId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      dispatch(action.migrateCard(cardId, targetListId))

      api.migrateCard(cardId, targetListId)



      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })
    }
  }
}
