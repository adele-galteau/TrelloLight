import { api } from './api'
import { push } from 'connected-react-router'
import * as action from './actionCreators'

export function addCard(content, listId) {
  return (dispatch) => {
      api.addCard(content, listId)
        .then(card => {
          dispatch(action.addCard(card, listId))
        })

        .catch(() => {
          dispatch(push('/login'))
          api.removeToken()
        })
  }
}

export function removeCard(cardId, listId) {
  return (dispatch) => {
      api.removeCard(cardId)

      .catch(() => {
        dispatch(push('/login'))
        api.removeToken()
      })

      dispatch(action.removeCard(cardId, listId))
  }
}

export function renameCard(content, cardId, listId) {
  return (dispatch) => {
      api.renameCard(content, cardId)

      .catch(() => {
        dispatch(push('/login'))
        api.removeToken()
      })

      dispatch(action.renameCard(content, cardId, listId))
  }
}

export function migrateCard(cardId, targetListId) {
  return (dispatch) => {
      dispatch(action.migrateCard(cardId, targetListId))

      api.migrateCard(cardId, targetListId)

      .catch(() => {
        dispatch(push('/login'))
        api.removeToken()
      })
  }
}
