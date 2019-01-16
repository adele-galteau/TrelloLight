import { db } from './db'
import { push } from 'connected-react-router'

export const ADD_LIST = "ADD_LIST"

export function addList(list) {
  return {
    type: ADD_LIST,
    payload: {
      list
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
