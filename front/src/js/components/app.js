import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import Protected from './protected'
import Login from './login'
import NotFound from './notFound'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("token") ?
      <Component {...props} />
      :
      <Redirect to="/login" />
  )}>
  </Route>
)

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={this.props.store}>

        <ConnectedRouter history={this.props.history}>
          <React.Fragment>

            <Switch>
              <Route path="/login" component={Login}></Route>
              <PrivateRoute path="/" component={Protected}/>
            </Switch>
            
          </React.Fragment>
        </ConnectedRouter>

      </Provider>
    )
  }
}

export default App
