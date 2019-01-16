import { push } from 'connected-react-router'
import { db } from './db'

export const RECEIVE_BOARDS = "RECEIVE_BOARDS"

export function receiveBoards(boards) {
  return {
    type: RECEIVE_BOARDS,
    payload: {
      boards
    }
  }
}

export function fetchBoards() {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.fetchBoards()
        .then(boards => {
          dispatch(receiveBoards(boards))
        })
    } else {
      dispatch(push('/login'))
    }
  }
}
