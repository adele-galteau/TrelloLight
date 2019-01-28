import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { boards } from './boards'
import { currentBoard } from './currentBoard'
import { currentLists } from './currentLists'
import { currentCards } from './currentCards'

export default(history) => combineReducers({
  router: connectRouter(history),
  boards,
  currentBoard,
  currentLists,
  currentCards
})
