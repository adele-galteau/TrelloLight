import React from 'react'
import Card from './card'
import { connect } from 'react-redux'
import { v4 as uuid4 } from 'uuid'
import { fetchRemoveList, fetchRenameList } from '../actions/lists'
import { fetchAddCard } from '../actions/cards'

class List extends React.Component {
  constructor(props) {
    super(props)

    this.list = this.props.list
    this.removeList = this.removeList.bind(this)
    this.renameList = this.renameList.bind(this)
    this.addCard = this.addCard.bind(this)
  }

  removeList() {
    console.log("list has been removed")
    this.props.removeList(this.list.id)
  }

  renameList() {
    const title = window.prompt("", "Rename list")
    this.props.renameList(title, this.list.id)
  }

  addCard() {
    const content = window.prompt("", "Add card content")
    this.props.addCard(content, this.list.id)
  }


  render() {
    console.log(this.list)
    return (
      <div className="p-1 mr-2 mb-3" style={{display:"inline-block", width: "272px", background: "#dfe3e6", borderRadius: "3px"}}>
        <h2 className="m-0" style={{color: "#17394d", fontWeight: "700", fontSize: "14px", padding: "10px 8px 10px 14px"}}>{this.list.title}</h2>
        <button onClick={this.renameList}>rename</button>
        <button onClick={this.removeList}>delete</button>

        {
          this.list.cards.map(card => (
            <Card key={uuid4()} card={card} listId={this.list.id}/>
          ))
        }

        <button onClick={this.addCard}>Add card</button>

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
