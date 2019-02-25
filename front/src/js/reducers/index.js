import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { boards } from './boards'
import { currentBoard } from './currentBoard'
import { currentLists } from './currentLists'
import { currentCards } from './currentCards'
import { detailedCard } from './detailedCard'
import { newBoardForm } from './newBoardForm'

export default(history) => combineReducers({
  router: connectRouter(history),
  boards,
  newBoardForm,
  currentBoard,
  currentLists,
  currentCards, 
  detailedCard
})
