import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { boards } from './boards'

export default(history) => combineReducers({
  router: connectRouter(history),
  boards
})
