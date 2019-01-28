import React from 'react'
import List from './list'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { fetchBoard, fetchRenameBoard } from '../actions/boards'
import { fetchRemoveBoard } from '../actions/boards'
import { fetchAddList } from '../actions/lists'
import { fetchMigrateCard } from '../actions/cards'

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInput: false,
      title: ""
    }

    this.boardId = this.props.match.params.boardId
    this.removeBoard = this.removeBoard.bind(this)
    this.renameBoard = this.renameBoard.bind(this)
    this.addList = this.addList.bind(this)
    this.showInput = this.showInput.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  showInput() {
    this.setState({
      showInput: true
    })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  removeBoard() {
    if (confirm("This board will be permanently deleted. Are you sure ?")) {
      this.props.removeBoard(this.boardId)
    }
  }

  renameBoard(e) {
    if (e.keyCode == 13) {
      this.setState({
        showInput: false
      })

      const title = this.state.title

      if (title != null && title.trim()) {
        this.props.renameBoard(title, this.boardId)
      }
    }
  }


  addList() {
    const title = window.prompt("","New List")

    if (title != null && title.trim()) {
      this.props.addList(title, this.boardId)
    }
  }

  onDragEnd(result) {
    this.props.migrateCard(result.draggableId, result.destination.droppableId)
  }

  componentDidMount() {
    this.props.fetchBoard(this.boardId)
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid" style={{background: "#0079bf", position:"absolute", top:"40px", bottom: "0"}}>
          <div className="row">
            <div className="col m-2 d-flex justify-content-start" style={{width:"30%"}}>

              {
                this.state.showInput ?
                  <div className="d-flex justify-content-start">
                    <input onKeyDown={this.renameBoard} onChange={this.onChangeTitle} placeholder={this.props.title} className="form-control form-control-md"></input>
                  </div>
                :
                  <h2 onClick={this.showInput} className="text-light m-1" style={{fontWeight: "700", fontSize: "18px"}}>
                  {this.props.title}
                  </h2>
              }

              <div className="dropdown ml-2">
                <button className="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div className="dropdown-menu pt-1 pb-1" aria-labelledby="dropdownMenuButton">
                  <a onClick={this.removeBoard} className="dropdown-item text-danger" style={{color: "#17394d", cursor: "text", fontSize: "14px", fontWeight: "bold", cursor:"pointer"}}>Delete this board</a>
                </div>
              </div>

            </div>
          </div>

          <div className="d-flex align-items-start">

            <DragDropContext onDragEnd={this.onDragEnd}>
              {
                this.props.lists.map(list => (
                  <List
                    key={list.id}
                    list={list}
                    cards={this.props.cards.filter(card => card.List == list.id)}
                  />
                ))
              }
            </DragDropContext>

            <div onClick={this.addList} className="p-1 mr-2 d-flex d-flex align-items-center" style={{display:"inline-block", width: "272px", background: "#006aa8", borderRadius: "3px", cursor: "pointer"}}>
              <p className="m-2" style={{color: "#c5ddeb", fontSize: "14px"}}>+ Add a list</p>
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
    lists: state.currentLists,
    cards: state.currentCards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: (boardId) => (dispatch(fetchBoard(boardId))),
    removeBoard: (boardId) => (dispatch(fetchRemoveBoard(boardId))),
    renameBoard: (title, boardId) => (dispatch(fetchRenameBoard(title, boardId))),
    addList: (title, boardId) => {dispatch(fetchAddList(title, boardId))},
    migrateCard: (cardId, homeListId, targetListId) => {dispatch(fetchMigrateCard(cardId, homeListId, targetListId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
