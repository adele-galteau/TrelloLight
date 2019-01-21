import { db } from './db'
import { replace } from 'connected-react-router'

export function logout() {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.logout()
      dispatch(replace('/login'))
    }
  }
}
