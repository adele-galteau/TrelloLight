import { api } from './api.js'
import { push } from 'connected-react-router'

export function login(username, password) {
  return (dispatch) => {
    api.authenticate(username, password, dispatch)
  }
}
