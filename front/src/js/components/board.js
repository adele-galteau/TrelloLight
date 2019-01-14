import React from 'react'
import { connect } from 'react-redux'
import { fetchBoard } from '../actions/board'

class Board extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.board_id)
  }

  render() {
    return (
      <h1>My lists</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    title: state.currentBoard.title,
    lists: state.currentBoard.lists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: (board_id) => (dispatch(fetchBoard(board_id)))
  }
}

export default connect(null, mapDispatchToProps)(Board)
