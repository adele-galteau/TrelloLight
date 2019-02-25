import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import createRootReducer from './reducers'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"

const history = createHashHistory()

const middlewares = composeWithDevTools(applyMiddleware(routerMiddleware(history), thunkMiddleware))

const enhancers = compose(
  middlewares
)

const store = createStore(createRootReducer(history), {}, enhancers)

ReactDOM.render(<App store={store} history={history} />, document.getElementById("app"))