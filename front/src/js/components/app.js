import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import Login from './login'
import Board from './board'
import Boards from './boards'
import Navbar from './navbar'

const App = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <React.Fragment>

          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Navbar}></Route>
          </Switch>

          <Switch>
            <Route path="/board/:board_id" component={Board}></Route>
            <Route path="/boards" component={Boards}></Route>
          </Switch>

        </React.Fragment>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
