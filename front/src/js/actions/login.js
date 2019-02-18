import { api } from './api.js'
import { push } from 'connected-react-router'

export function login(username, password) {
  return (dispatch) => {
    api.login(username, password)
      .then(resp => {
          dispatch(push('/boards'))
      })   
  }
}
