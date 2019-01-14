import { push } from 'connected-react-router'
import { db } from './db'

export function fetchBoards() {
  return (dispatch) => {
    console.log(db.isAuthenticate())
    if (db.isAuthenticate()) {
      db.fetchBoards()
    } else {
      dispatch(push('/login'))
    }
  }
}
