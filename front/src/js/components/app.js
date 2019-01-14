import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import Login from './login'
import Board from './board'
import Boards from './boards'

const App = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>

        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/board/:board_id" component={Board}></Route>
          <Route exact path="/" component={Boards}></Route>
        </Switch>

      </ConnectedRouter>
    </Provider>
  )
}

export default App
