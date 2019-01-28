import { api } from './api'
import { replace } from 'connected-react-router'
import * as action from './actionCreators'

export function fetchAddList(title, boardId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.addList(title, boardId)
      .then(list => {
        dispatch(action.addList(list))
      })

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })
    }
  }
}

export function fetchRemoveList(listId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.removeList(listId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.removeList(listId))
    }
  }
}

export function fetchRenameList(title, listId) {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.renameList(title, listId)

      .catch(() => {
        dispatch(replace('/login'))
        api.removeToken()
      })

      dispatch(action.renameList(title, listId))
    }
  }
}
