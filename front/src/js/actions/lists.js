import { api } from './api'
import { push } from 'connected-react-router'
import * as action from './actionCreators'

export function addList(title, boardId) {
  return (dispatch) => {
      api.addList(title, boardId)
      .then(list => {
        dispatch(action.addList(list))
      })

      .catch(() => {
        dispatch(push('/login'))
        api.removeToken()
      })
  }
}

export function removeList(listId) {
  return (dispatch) => {
      api.removeList(listId)

      .catch(() => {
        dispatch(push('/login'))
        api.removeToken()
      })

      dispatch(action.removeList(listId))
  }
}

export function renameList(title, listId) {
  return (dispatch) => {
      api.renameList(title, listId)

      .catch(() => {
        dispatch(push('/login'))
        api.removeToken()
      })

      dispatch(action.renameList(title, listId))
  }
}
