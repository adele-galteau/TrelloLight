import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { boards } from './boards'
import { currentBoard } from './currentBoard'

export default(history) => combineReducers({
  router: connectRouter(history),
  boards,
  currentBoard
})
