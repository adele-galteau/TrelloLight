import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import Login from './login'
import Board from './board'
import Boards from './boards'
import Navbar from './navbar'
import NotFound from './notFound'

class App extends React.Component {
  constructor(props) {
    super(props)

  }

  onDragEnd() {}

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Provider store={this.props.store}>
          <ConnectedRouter history={this.props.history}>
            <React.Fragment>

              <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route path="/" component={Navbar}></Route>
              </Switch>

              <Switch>
                <Route path="/board/:boardId" component={Board}></Route>
                <Route path="/boards" component={Boards}></Route>
                <Route path="/login"></Route>
                <Route exact path="/" component={Boards}></Route>
                <Route path="/" component={NotFound}></Route>
              </Switch>

            </React.Fragment>
          </ConnectedRouter>
        </Provider>
      </DragDropContext>
    )
  }
}

export default App
