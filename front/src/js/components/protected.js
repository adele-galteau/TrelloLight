import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hideBoardInput, hideListInput, hideNewListInput, hideNewCardInput } from '../actions/actionCreators'
import { connect } from 'react-redux'
import Board from './board'
import Boards from './boards'
import Navbar from './navbar'
import NotFound from './notFound'
import InternalServerError from './internalServerError'

class Protected extends React.Component {
    constructor(props) {
        super(props)

        this.hideInput = this.hideInput.bind(this)
    }

    hideInput(e) {
    const exceptions = ".hide-input-exception"
        
        if (!e.target.matches(exceptions)) {
        this.props.hideBoardInput()
        this.props.hideListInput()
        this.props.hideNewListInput()
        this.props.hideNewCardInput()
        }
    }

    render() {
        return (
            <div onClick={this.hideInput}>
                <Route component={Navbar}></Route>
                <Switch>
                    <Route path="/board/:boardId" component={Board}></Route>
                    <Route path="/boards" component={Boards}></Route>
                    <Route path="/500" component={InternalServerError}></Route>
                    <Route path="/" component={NotFound}></Route>
                </Switch>
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideBoardInput: () => {dispatch(hideBoardInput())},
        hideListInput: () => {dispatch(hideListInput())},
        hideNewListInput: () => {dispatch(hideNewListInput())},
        hideNewCardInput: () => {dispatch(hideNewCardInput())}
    }
}

export default connect(null, mapDispatchToProps)(Protected)