import { db } from './db'
import { push } from 'connected-react-router'

export const RECEIVE_BOARD = 'RECEIVE_BOARD'

export function receiveBoard(board) {
  return {
    type: RECEIVE_BOARD,
    payload: {
      board
    }
  }
}

export function fetchBoard(board_id) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.fetchBoard(board_id)
        .then(board => {dispatch(receiveBoard(board))})

    } else {
      dispatch(push('/login'))
    }
  }
}
