import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import Login from './login'
import Board from './board'
import Home from './home'

const App = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>

        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/my-board" component={Board}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>

      </ConnectedRouter>
    </Provider>
  )
}

export default App
