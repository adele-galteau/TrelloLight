import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Board from './board'
import Boards from './boards'
import Navbar from './navbar'
import NotFound from './notFound'

export default class Protected extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route component={Navbar}></Route>
                <Switch>
                    <Route path="/board/:boardId" component={Board}></Route>
                    <Route path="/boards" component={Boards}></Route>
                    <Route path="/" component={NotFound}></Route>
                </Switch>
            </React.Fragment>
            
        )
    }
}