import React from "react"
import ReactDOM from "react-dom"
import App from './components/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import createRootReducer from './reducers'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

const history = createHashHistory()

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

ReactDOM.render(<App store={store} history={history} />, document.getElementById("app"))
