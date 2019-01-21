import { db } from './db'
import { replace } from 'connected-react-router'

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

export function fetchBoard(boardId) {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.fetchBoard(boardId)
        .then(board => {
          dispatch(receiveBoard(board))
        })

        .catch(() => {
          dispatch(replace('/login'))
          db.removeToken()
        })
    }
  }
}

export function fetchRenameBoard(title, boardId) {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.renameBoard(title, boardId)
      dispatch(renameBoard(title, boardId))

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })
    }
  }
}
