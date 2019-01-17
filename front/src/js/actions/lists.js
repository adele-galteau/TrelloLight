import { db } from './db'
import { push } from 'connected-react-router'

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
    if (db.isAuthenticate()) {
      db.addList(title, boardId)
      .then(list => {dispatch(addList(list))})
    }
    else {
      dispatch(push('/login'))
    }
  }
}

export function fetchRemoveList(listId) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.removeList(listId)
      dispatch(removeList(listId))
    }
    else {
      dispatch(push('/login'))
    }
  }
}

export function fetchRenameList(title, listId) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.renameList(title, listId)
      dispatch(renameList(title, listId))
    }
    else {
      dispatch(push('/login'))
    }
  }
}
