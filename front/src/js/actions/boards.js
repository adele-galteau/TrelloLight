import { push, replace } from 'connected-react-router'
import { api } from './api'
import * as action from './actionCreators'

export function getBoards() {
  return (dispatch) => {
      api.fetchBoards()
        .then(boards => {
          dispatch(action.receiveBoards(boards))
        })

        .catch(() => {
          dispatch(replace('/login'))
          api.removeToken()
        })
  }
}

export function addBoard(boardTitle) {
  return (dispatch) => {
      api.addBoard(boardTitle)
        .then(board => {
          dispatch(action.addBoard(board))
        })
        .catch(() => {
          dispatch(replace('/login'))
          api.removeToken()
        })
  }
}

export function removeBoard(boardId) {
  return (dispatch) => {
      api.removeBoard(boardId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.removeBoard(boardId))
      dispatch(push('/boards'))
  }
}


export function getBoard(boardId) {
  return (dispatch) => {
      api.fetchBoard(boardId)
        .then(board => {
          dispatch(action.receiveBoard(board))
        })
      api.fetchCards(boardId)
        .then(cards => {
          dispatch(action.receiveCards(cards))
        })

        .catch(() => {
          dispatch(replace('/login'))
          api.removeToken()
        })
  }
}

export function renameBoard(title, boardId) {
  return (dispatch) => {
      api.renameBoard(title, boardId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.renameBoard(title, boardId))
  }
}
