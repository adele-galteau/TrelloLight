import React from 'react'
import Card from './card'
import { Droppable } from 'react-beautiful-dnd'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { removeList, renameList } from '../actions/lists'
import { addCard } from '../actions/cards'
import { showListInput, hideListInput, hideBoardInput, showNewCardInput, hideNewCardInput } from '../actions/actionCreators'

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      newCardTitle: ""
    }

    this.list = this.props.list
    this.removeList = this.removeList.bind(this)
    this.renameList = this.renameList.bind(this)
    this.addCard = this.addCard.bind(this)
    this.showInput = this.showInput.bind(this)
    this.showNewCardInput = this.showNewCardInput.bind(this)
    this.hideNewCardInput = this.hideNewCardInput.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeNewCardTitle = this.onChangeNewCardTitle.bind(this)
  }

  showInput() {
    this.props.showInput(this.list.id)
    this.props.hideBoardInput()
    this.props.hideNewCardInput()
  }

  showNewCardInput() {
    this.props.showNewCardInput(this.list.id)
    this.props.hideBoardInput()
    this.props.hideListInput()
  }

  hideNewCardInput() {
    this.props.hideNewCardInput()

    this.setState({
      newCardTitle: ""
    })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeNewCardTitle(e) {
    this.setState({
      newCardTitle: e.target.value
    })
  }

  removeList() {
    this.props.removeList(this.list.id)
  }

  renameList(e) {
    if (e.keyCode == 13) {
      this.props.hideListInput()

      const title = this.state.title

      if (title != null && title.trim()) {
        this.props.renameList(title, this.list.id)
      }
    }
  }

  addCard() {
    const content = this.state.newCardTitle

    if (content != null && content.trim()) {
      this.props.addCard(content, this.list.id)

      this.setState({
        newCardTitle: ""
      })
    }
  }


  render() {
    return (
      <div className="p-1 mr-2 mb-3" style={{display:"inline-block", width: "272px", background: "#dfe3e6", borderRadius: "3px"}}>

        <div className="d-flex justify-content-between">
          {
            this.list.showInput ?
              <input ref={(input) => {this.input = input}} onChange={this.onChangeTitle} onKeyDown={this.renameList} placeholder={this.props.list.title} className="hide-input-exception form-control form-control-sm"></input>
            :
              <h2 className="hide-input-exception m-0" onClick={this.showInput} style={{color: "#17394d", fontWeight: "700", fontSize: "14px", padding: "10px 8px 10px 14px"}}>
                {this.list.title}
              </h2>
          }

          <div className="dropdown">
            <button className="btn btn-sm dropdown-toggle pt-2 pr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown"></button>
            <div className="dropdown-menu pt-1 pb-1" aria-labelledby="dropdownMenuButton">
              <a onClick={this.removeList} className="dropdown-item" style={{color: "#17394d", fontWeight: "700", fontSize: "14px", cursor:"pointer"}}>Delete this list</a>
            </div>
          </div>

        </div>

          <Droppable droppableId={this.list.id.toString()}>

            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}

                style={{height:
                  this.props.cards.length == 0 ?
                  snapshot.isDraggingOver ? "40px" : "5px"
                  :
                  ""
                }}
              >

              {
                this.props.cards.map((card, index) => (
                  <Card key={card.id} card={card} listId={this.list.id} index={index}/>
                ))
              }

              {provided.placeholder}
              </div>
            )}

          </Droppable>

        {
          this.list.showNewCardInput ?
            <div>
              <div className="hide-input-exception bg-light mx-1 mb-2" style={{borderRadius: "3px", boxShadow: "0 1px 0 rgba(9,45,66,.25)", padding: "6px 8px 6px"}}> 
                <textarea onChange={this.onChangeNewCardTitle} value={this.state.newCardTitle} className="hide-input-exception form-control form-control-sm mb-1" placeholder="Enter a title for this card..." style={{border: "none", background: "transparent", padding: "0", marginBottom: "10px" }}></textarea>
              </div>

              <div className="hide-input-exception d-flex align-items-center" style={{margin:"0 4px 2px 4px"}}>
                <button onClick={this.addCard} className="hide-input-exception btn btn-success btn-sm" style={{fontWeight:"700"}}>Add List</button>
                <button onClick={this.hideNewCardInput} className="hide-input-exception" style={{border: "none", background: "transparent", fontWeight: "400", color: "#798d99", fontSize: "29px", lineHeight: "32px", cursor: "pointer"}}>&times;</button>
              </div>
            </div>
          :
            <p onClick={this.showNewCardInput} className="hide-input-exception" style={{color: "#6b808c", fontSize: "14px", fontWeight: "400px", cursor:"pointer", margin: "13px 0px 8px 7px"}}>+ Add a card</p>
        }

      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    removeList: (listId) => {dispatch(removeList(listId))},
    renameList: (title, listId) => {dispatch(renameList(title, listId))},
    addCard: (content, listId) => {dispatch(addCard(content, listId))},
    showInput: (listId) => {dispatch(showListInput(listId))},
    hideListInput: () => {dispatch(hideListInput())},
    hideBoardInput:() => {dispatch(hideBoardInput())},
    showNewCardInput:(listId) => {dispatch(showNewCardInput(listId))},
    hideNewCardInput: () => {dispatch(hideNewCardInput())}
  }
}
export default withRouter(connect(null, mapDispatchToProps)(List))
