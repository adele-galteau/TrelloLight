import React from 'react'
import List from './list'
import { v4 as uuid4 } from 'uuid'
import { connect } from 'react-redux'
import { fetchBoard } from '../actions/board'
import { fetchRemoveBoard } from '../actions/boards'

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.boardId = this.props.match.params.board_id
    this.removeBoard = this.removeBoard.bind(this)
  }

  removeBoard() {
    this.props.removeBoard(this.boardId)
  }

  componentDidMount() {
    this.props.fetchBoard(this.boardId)
  }

  render() {
    console.log(this.boardId)
    return (
      <React.Fragment>
        <div className="container-fluid" style={{background: "#0079bf", position:"absolute", top:"40px", bottom: "0"}}>
          <div className="row">
            <div className="col m-2">
              <p className="text-light m-1" style={{fontWeight: "700", fontSize: "18px"}}>{this.props.title}</p>
              <button onClick={this.removeBoard} >delete</button>
            </div>
          </div>

          <div className="d-flex align-items-start">
            {
              this.props.lists.map(list => (
                <List key={uuid4()} list={list}/>
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
    fetchBoard: (board_id) => (dispatch(fetchBoard(board_id))),
    removeBoard: (boardId) => (dispatch(fetchRemoveBoard(boardId)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
