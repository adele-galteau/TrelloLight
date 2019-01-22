import { push, replace } from 'connected-react-router'
import { db } from './db'

export const RECEIVE_BOARDS = "RECEIVE_BOARDS"
export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'

export function receiveBoards(boards) {
  return {
    type: RECEIVE_BOARDS,
    payload: {
      boards
    }
  }
}

export function addBoard(board) {
  return {
    type: ADD_BOARD,
    payload: {
      board
    }
  }
}

export function removeBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    payload: {
      boardId
    }
  }
}

export function fetchBoards() {
  return (dispatch) => {
    if (db.isAuthenticated(dispatch)) {
      db.fetchBoards()
        .then(boards => {
          dispatch(receiveBoards(boards))
        })

        .catch(() => {
          dispatch(replace('/login'))
          db.removeToken()
        })
    }
  }
}

export function fetchAddBoard(boardTitle) {
  return (dispatch) => {
    if (db.isAuthenticated(dispatch)) {
      db.addBoard(boardTitle)
        .then(board => {
          dispatch(addBoard(board))
        })
        .catch(() => {
          dispatch(replace('/login'))
          db.removeToken()
        })
    }
  }
}

export function fetchRemoveBoard(boardId) {
  return (dispatch) => {
    if (db.isAuthenticated(dispatch)) {
      db.removeBoard(boardId)

      .catch(() => {
        dispatch(replace('/login'))
        db.removeToken()
      })
      
      dispatch(removeBoard(boardId))
      dispatch(push('/boards'))

    }
  }
}
