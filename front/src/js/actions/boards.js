import { push } from 'connected-react-router'
import { db } from './db'

export const SHOW_BOARDS = "SHOW_BOARDS"

export function showBoards(boards) {
  return {
    type: SHOW_BOARDS,
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
          dispatch(showBoards(boards))
        })
    } else {
      dispatch(push('/login'))
    }
  }
}
