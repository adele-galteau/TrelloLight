import { api } from './api'
import { replace } from 'connected-react-router'

export function logout() {
  return (dispatch) => {
    if (api.isAuthenticated(dispatch)) {
      api.logout()
      dispatch(replace('/login'))
    }
  }
}
