import { db } from './db'
import { push } from 'connected-react-router'

export const GET_BOARD = 'GET_BOARD'
export const SHOW_LISTS = 'SHOW_LISTS'

export function getBoard(board) {
  return {
    type: GET_BOARD,
    payload: {
      board
    }
  }
}

export function fetchBoard(board_id) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.fetchBoard(board_id)
        .then(board => {dispatch(getBoard(board))})

    } else {
      dispatch(push('/login'))
    }
  }
}
