import React from 'react'
import List from './list'
import DetailedCard from './detailedCard'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { getBoard, renameBoard, removeBoard } from '../actions/boards'
import { addList } from '../actions/lists'
import { migrateCard } from '../actions/cards'
import { showBoardInput, hideBoardInput, hideListInput, showNewListInput, hideNewListInput } from '../actions/actionCreators'

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      newListTitle: ""
    }

    this.boardId = this.props.match.params.boardId
    this.showBoardInput = this.showBoardInput.bind(this)
    this.showNewListInput = this.showNewListInput.bind(this)
    this.hideNewListInput = this.hideNewListInput.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeNewListTitle = this.onChangeNewListTitle.bind(this)
    this.addList = this.addList.bind(this)
    this.removeBoard = this.removeBoard.bind(this)
    this.renameBoard = this.renameBoard.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  showBoardInput() {
    this.props.showBoardInput()
    this.props.hideNewListInput()
    this.props.hideListInput()
  }

  showNewListInput() {
    this.props.showNewListInput()
    this.props.hideBoardInput()
    this.props.hideListInput()
  }

  hideNewListInput() {
    this.props.hideNewListInput()
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeNewListTitle(e) {
    this.setState({
      newListTitle: e.target.value
    })
  }

  addList() {
    const title = this.state.newListTitle

    if (title != null && title.trim()) {
      this.props.addList(title, this.boardId)

      this.setState({
        newListTitle: ""
      })
    }
  }

  removeBoard() {
    if (confirm("This board will be permanently deleted. Are you sure ?")) {
      this.props.removeBoard(this.boardId)
    }
  }

  renameBoard(e) {
    if (e.keyCode == 13) {
      this.props.hideBoardInput()

      const title = this.state.title

      if (title != null && title.trim()) {
        this.props.renameBoard(title, this.boardId)
      }
    }
  }

  onDragEnd(result) {
    this.props.migrateCard(result.draggableId, result.destination.droppableId)
  }

  componentDidMount() {
    this.props.getBoard(this.boardId)
  }


  render() {
    return (
      <React.Fragment>
        <div className="container-fluid" style={{background: "#0079bf", position:"absolute", top:"40px", bottom: "0"}}>
          <div className="row">
            <div className="col m-2 d-flex justify-content-start" style={{width:"30%"}}>

              {
                this.props.currentBoard.showInput ?
                  <div className="d-flex justify-content-start">
                    <input className="hide-input-exception form-control form-control-md" onKeyDown={this.renameBoard} onChange={this.onChangeTitle} placeholder={this.props.currentBoard.title}></input>
                  </div>
                :
                  <h2 onClick={this.showBoardInput} className="hide-input-exception text-light m-1" style={{fontWeight: "700", fontSize: "18px"}}>
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

            {
              this.props.currentBoard.showNewListInput ? 
                <div className="hide-input-exception p-1 mr-2 mb-3" style={{display:"inline-block", width: "272px", background: "#dfe3e6", borderRadius: "3px"}}> 
                    <input className="hide-input-exception form-control form-control-sm mb-1" onChange={this.onChangeNewListTitle} value={this.state.newListTitle} placeholder="Enter list title..."></input>
                    
                    <div className="d-flex align-items-center">
                      <button onClick={this.addList} className="hide-input-exception btn btn-success btn-sm ml" style={{fontWeight:"700"}}>Add List</button>
                      <button onClick={this.hideNewListInput} style={{border: "none", background: "transparent", fontWeight: "400", color: "#798d99", fontSize: "29px", lineHeight: "32px"}}>&times;</button>
                    </div>
                </div>
              :
                <div onClick={this.showNewListInput} className="hide-input-exception p-1 mr-2 d-flex d-flex align-items-center" style={{display:"inline-block", width: "272px", background: "#006aa8", borderRadius: "3px", cursor: "pointer"}}>
                  <p className="hide-input-exception m-2" style={{color: "#c5ddeb", fontSize: "14px"}}>+ Add a list</p>
                </div>
            }

          </div>
        </div>

        {
          this.props.detailedCard.show == true ?
            <DetailedCard />
          :
           ""
        }

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentBoard: state.currentBoard,
    title: state.currentBoard.title,
    lists: state.currentLists,
    cards: state.currentCards,
    detailedCard: state.detailedCard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBoard: (boardId) => (dispatch(getBoard(boardId))),
    removeBoard: (boardId) => (dispatch(removeBoard(boardId))),
    renameBoard: (title, boardId) => (dispatch(renameBoard(title, boardId))),
    addList: (title, boardId) => {dispatch(addList(title, boardId))},
    migrateCard: (cardId, targetListId) => {dispatch(migrateCard(cardId, targetListId))},
    showBoardInput: () => {dispatch(showBoardInput())},
    hideListInput: () => {dispatch(hideListInput())},
    hideBoardInput: () => {dispatch(hideBoardInput())},
    showNewListInput: () => {dispatch(showNewListInput())},
    hideNewListInput: () => {dispatch(hideNewListInput())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
