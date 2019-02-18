import { api } from './api'
import { push } from 'connected-react-router'

export function logout() {
  return (dispatch) => {
    api.logout()
    dispatch(push('/login'))
  }
}
