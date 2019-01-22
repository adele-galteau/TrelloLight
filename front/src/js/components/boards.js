import React from 'react'
import BoardTile from './boardTile'
import { connect } from 'react-redux'
import { fetchBoards } from '../actions/boards'
import { fetchAddBoard } from '../actions/boards'

class Boards extends React.Component {
  constructor(props) {
    super(props)

    this.addBoard = this.addBoard.bind(this)
  }

  componentDidMount() {
    this.props.fetchBoards()
  }

  addBoard() {
    const boardTitle = window.prompt("", "Add board title")

    if (boardTitle != null && boardTitle.trim()) {
      this.props.addBoard(boardTitle)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col">
              <p className="ml-3 mb-3" style={{color: "#17394d", fontWeight: "700"}}>My Boards</p>

              <div className="row">

              {
                this.props.boards.map(board => (
                    <BoardTile key={board.id} board={board}/>
                ))
              }

                <div className="col-6">
                  <div onClick={this.addBoard} className="d-flex justify-content-center align-items-center" style={{background:"rgba(9,45,66,.08)", borderRadius: "3px", height: "96px", cursor: "pointer"}}>
                    <p style={{color: "#6b808c", fontSize: "14px"}}>Create new board...</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => {dispatch(fetchBoards())},
    addBoard: (boardTitle) => {dispatch(fetchAddBoard(boardTitle))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
