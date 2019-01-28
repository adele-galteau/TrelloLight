import { push, replace } from 'connected-react-router'
import { api } from './api'
import * as action from './actionCreators'

export function fetchBoards() {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
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
}

export function fetchAddBoard(boardTitle) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
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
}

export function fetchRemoveBoard(boardId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.removeBoard(boardId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.removeBoard(boardId))
      dispatch(push('/boards'))

    }
  }
}


export function fetchBoard(boardId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
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
}

export function fetchRenameBoard(title, boardId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.renameBoard(title, boardId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.renameBoard(title, boardId))

    }
  }
}
