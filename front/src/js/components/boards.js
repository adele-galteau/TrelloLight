import React from 'react'
import HomeNavbar from './homeNavbar'
import { connect } from 'react-redux'
import { fetchBoards } from '../actions/boards'

class Boards extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchBoards()
  }

  render() {
    // console.log(this.props)
    return (
      <React.Fragment>
        <HomeNavbar />

        <div className="container">
          <h1>Home component</h1>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoards: () => {dispatch(fetchBoards())}
  }
}

export default connect(null, mapDispatchToProps)(Boards)
