import { db } from './db'
import { push } from 'connected-react-router'

export const RECEIVE_BOARD = 'RECEIVE_BOARD'
export const RENAME_BOARD = 'RENAME_BOARD'

export function receiveBoard(board) {
  return {
    type: RECEIVE_BOARD,
    payload: {
      board
    }
  }
}

export function renameBoard(title, boardId) {
  return {
    type: RENAME_BOARD,
    payload: {
      title,
      boardId
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

export function fetchRenameBoard(title, boardId) {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.renameBoard(title, boardId)
      dispatch(renameBoard(title, boardId))

    } else {
      dispatch(push('/login'))
    }
  }
}
