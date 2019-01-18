import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import Login from './login'
import Board from './board'
import Boards from './boards'
import Navbar from './navbar'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.onDragEnd = this.onDragEnd.bind(this)
  }



  onDragEnd() {
    console.log("prout")
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Provider store={this.props.store}>
          <ConnectedRouter history={this.props.history}>
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
      </DragDropContext>
    )

  }
}

export default App
