import { db } from './db'

export function logout() {
  return (dispatch) => {
    if (db.isAuthenticate(dispatch)) {
      db.logout()
    }
  }
}
