import { db } from './db'
import { push } from 'connected-react-router'

export function logout() {
  return (dispatch) => {
    if (db.isAuthenticate()) {
      db.logout()
      dispatch(push('/login'))
    }
    else {
      dispatch(push('/login'))
    }
  }
}
