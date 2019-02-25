import React from 'react'
import { connect } from 'react-redux'
import { addBoard } from '../actions/boards'
import { hideNewBoardForm } from '../actions/actionCreators'

class NewBoardForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ""
    }

    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.addBoard = this.addBoard.bind(this)
    this.hideNewBoardForm = this.hideNewBoardForm.bind(this)
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  addBoard() {
    const boardTitle = this.state.title
    
    if (boardTitle != null && boardTitle.trim()) {
      this.props.addBoard(boardTitle)
      this.props.hideNewBoardForm()
    }
  }

  hideNewBoardForm() {
    this.props.hideNewBoardForm()
  }

  render() {
    return (
      <div className="container-fluid" style={{background: "rgba(0, 0, 0, 0.64)", zIndex:"0", position: "absolute", top: "0", bottom: "0"}}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="mt-5 p-2 pb-4 mb-2" style={{background: "rgb(0, 121, 191)", borderRadius: "3px"}}>
              
              <button onClick={this.hideNewBoardForm} className="close">&times;</button>
              <input onChange={this.onChangeTitle} className="form-control form-control-sm" style={{width: "220px", fontWeight: "700"}} placeholder="Add board title"></input>
            </div>
            <button onClick={this.addBoard} className="btn btn-success btn-sm" style={{fontWeight:"700"}}>
              Create board
            </button>
          </div>
        </div>
      </div>
    ) 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBoard: (boardTitle) => {dispatch(addBoard(boardTitle))},
    hideNewBoardForm: () => {dispatch(hideNewBoardForm())}
  }
}

export default connect(null, mapDispatchToProps)(NewBoardForm)