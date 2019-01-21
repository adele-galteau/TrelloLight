import { db } from './db'
import { replace } from 'connected-react-router'

export const ADD_CARD = "ADD_CARD"
export const REMOVE_CARD = "REMOVE_CARD"
export const RENAME_CARD = "RENAME_CARD"
export const MIGRATE_CARD = "MIGRATE_CARD"

export function addCard(card, listId) {
  return {
    type: ADD_CARD,
    payload: {
      card,
      listId
    }
  }
}

export function removeCard(cardId, listId) {
  return {
    type: REMOVE_CARD,
    payload: {
      cardId,
      listId
    }
  }
}

export function renameCard(content, cardId, listId) {
  return {
    type: RENAME_CARD,
    payload: {
      content,
      cardId,
      listId
    }
  }
}

export function migrateCard(card, homeListId, targetListId) {
  return {
    type: MIGRATE_CARD,
    payload: {
      card,
      homeListId,
      targetListId
    }
  }
}

export function fetchAddCard(content, listId) {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.addCard(content, listId)
        .then(card => {
          dispatch(addCard(card, listId))
        })

        .catch(() => {
          dispatch(replace('/login'))
          db.removeToken()
        })
    }
  }
}

export function fetchRemoveCard(cardId, listId) {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.removeCard(cardId)
      dispatch(removeCard(cardId, listId))

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })
    }
  }
}

export function fetchRenameCard(content, cardId, listId) {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.renameCard(content, cardId)
      dispatch(renameCard(content, cardId, listId))

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })
    }
  }
}

export function fetchMigrateCard(cardId, homeListId, targetListId) {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.migrateCard(cardId, targetListId)
      .then(card => {
        dispatch(migrateCard(card, homeListId, targetListId))
      })

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })
    }
  }
}
