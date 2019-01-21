import React from 'react'
import Card from './card'
import { Draggable } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { v4 as uuid4 } from 'uuid'
import { fetchRemoveList, fetchRenameList } from '../actions/lists'
import { fetchAddCard } from '../actions/cards'

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInput: false,
      title: ""
    }

    this.list = this.props.list
    this.removeList = this.removeList.bind(this)
    this.renameList = this.renameList.bind(this)
    this.addCard = this.addCard.bind(this)
    this.showInput = this.showInput.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
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

  removeList() {
    this.props.removeList(this.list.id)
  }

  renameList(e) {
    if (e.keyCode == 13) {
      this.setState({
        showInput: false
      })

      const title = this.state.title

      if (title != null && title.trim()) {
        this.props.renameList(title, this.list.id)
      }
    }
  }

  addCard() {
    const content = window.prompt("", "Add card content")

    if (content != null && content.trim()) {
      this.props.addCard(content, this.list.id)
    }
  }


  render() {
    console.log("list id", this.list.id.toString())
    return (
      <div className="p-1 mr-2 mb-3" style={{display:"inline-block", width: "272px", background: "#dfe3e6", borderRadius: "3px"}}>

        <div className="d-flex justify-content-between">
          {
            this.state.showInput ?
              <input onChange={this.onChangeTitle} onKeyDown={this.renameList} placeholder={this.list.title} className="form-control form-control-sm"></input>
            :
              <h2 onClick={this.showInput} className="m-0" style={{color: "#17394d", fontWeight: "700", fontSize: "14px", padding: "10px 8px 10px 14px"}}>
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

          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>

            {
              this.list.cards.map((card, index) => (
                <Card key={card.id} card={card} listId={this.list.id} index={index}/>
              ))
            }

            {provided.placeholder}
            </div>
          )}

        </Droppable>

        <p onClick={this.addCard} style={{color: "#6b808c", fontSize: "14px", fontWeight: "400px", cursor:"pointer", margin: "13px 0px 8px 7px"}}>+ Add a card</p>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeList: (listId) => {dispatch(fetchRemoveList(listId))},
    renameList: (title, listId) => {dispatch(fetchRenameList(title, listId))},
    addCard: (content, listId) => {dispatch(fetchAddCard(content, listId))}
  }
}
export default connect(null, mapDispatchToProps)(List)
