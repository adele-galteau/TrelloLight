import React from 'react'
import Navbar from './navbar'
import List from './list'
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
      <React.Fragment>
        <Navbar />
        <div className="container-fluid" style={{background: "#0079bf", position:"absolute", top:"40px", bottom: "0"}}>
          <div className="row">
            <div className="col m-2">
              <p className="text-light m-1" style={{fontWeight: "700", fontSize: "18px"}}>{this.props.title}</p>
            </div>
          </div>

          <div>
            {
              this.props.lists.map(list => (
                <List />
              ))
            }

            <div className="p-1 mr-2 d-flex d-flex align-items-center" style={{display:"inline-block", width: "272px", background: "#006aa8", borderRadius: "3px"}}>
              <p className="m-2" style={{color: "#c5ddeb", fontSize: "14px"}}>+ Add another list</p>
            </div>

          </div>
        </div>

      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Board)
