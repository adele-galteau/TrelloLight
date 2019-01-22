import { db } from './db'
import { replace } from 'connected-react-router'

export const ADD_LIST = "ADD_LIST"
export const REMOVE_LIST = "REMOVE_LIST"
export const RENAME_LIST = "RENAME_LIST"

export function addList(list) {
  return {
    type: ADD_LIST,
    payload: {
      list
    }
  }
}

export function removeList(listId) {
  return {
    type: REMOVE_LIST,
    payload: {
      listId
    }
  }
}

export function renameList(title, listId) {
  return {
    type: RENAME_LIST,
    payload: {
      title,
      listId
    }
  }
}


export function fetchAddList(title, boardId) {
  return (dispatch) => {
    if (db.isAuthenticated(dispatch)) {
      db.addList(title, boardId)
      .then(list => {
        dispatch(addList(list))
      })

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })
    }
  }
}

export function fetchRemoveList(listId) {
  return (dispatch) => {
    if (db.isAuthenticated(dispatch)) {
      db.removeList(listId)

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })

      dispatch(removeList(listId))
    }
  }
}

export function fetchRenameList(title, listId) {
  return (dispatch) => {
    if (db.isAuthenticated(dispatch)) {
      db.renameList(title, listId)

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })

      dispatch(renameList(title, listId))
    }
  }
}
