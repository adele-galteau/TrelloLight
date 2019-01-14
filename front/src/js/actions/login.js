import { db } from './db.js'
import { push } from 'connected-react-router'


export function addToken(username, password) {
  return (dispatch) => {
    db.authenticate(username, password, dispatch)
      .catch(console.log)
  }
}
