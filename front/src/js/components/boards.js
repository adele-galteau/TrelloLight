import React from 'react'
import BoardTile from './boardTile'
import NewBoardForm from './newBoardForm'
import { connect } from 'react-redux'
import { getBoards } from '../actions/boards'
import { showNewBoardForm } from '../actions/actionCreators'

class Boards extends React.Component {
  constructor(props) {
    super(props)

    this.showNewBoardForm = this.showNewBoardForm.bind(this)
  }

  showNewBoardForm() {
    this.props.showNewBoardForm()
  }
  
  componentDidMount() {
    this.props.getBoards()
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
                  <div onClick={this.showNewBoardForm} className="d-flex justify-content-center align-items-center" style={{background:"rgba(9,45,66,.08)", borderRadius: "3px", height: "96px", cursor: "pointer"}}>
                    <p style={{color: "#6b808c", fontSize: "14px"}}>Create new board...</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {
          this.props.newBoardForm.show ?
            <NewBoardForm />
          :
            ""
        }

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    newBoardForm: state.newBoardForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBoards: () => {dispatch(getBoards())},
    showNewBoardForm: () => {dispatch(showNewBoardForm())},
    hideNewBoardForm:() => {dispatch(hideNewBoardForm())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
