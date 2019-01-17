import { db } from './db'
import { push } from 'connected-react-router'

export const ADD_CARD = "ADD_CARD"
export const REMOVE_CARD = "REMOVE_CARD"
export const RENAME_CARD = "RENAME_CARD"

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

export function fetchAddCard(content, listId) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.addCard(content, listId)
        .then(card => {dispatch(addCard(card, listId))})
    }
    else {
      dispatch(push('/login'))
    }
  }
}

export function fetchRemoveCard(cardId, listId) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.removeCard(cardId)
      dispatch(removeCard(cardId, listId))
    }
    else {
      dispatch(push('/login'))
    }
  }
}

export function fetchRenameCard(content, cardId, listId) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.renameCard(content, cardId)
      dispatch(renameCard(content, cardId, listId))
    }
    else {
      dispatch(push('/login'))
    }
  }
}
