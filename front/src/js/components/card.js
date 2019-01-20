import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { fetchRemoveCard, fetchRenameCard, fetchMigrateCard } from '../actions/cards'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.card = this.props.card
    this.index = this.props.index
    this.listId = this.props.listId
    this.removeCard = this.removeCard.bind(this)
    this.renameCard = this.renameCard.bind(this)
    this.migrateCard = this.migrateCard.bind(this)
  }

  removeCard() {
    this.props.removeCard(this.card.id, this.listId)
  }

  renameCard() {
    const content = window.prompt("", "Rename Card")

    if (content != null && content.trim()) {
      this.props.renameCard(content, this.card.id, this.listId)
    }
  }

  migrateCard() {
    this.props.migrateCard(this.card.id, this.listId, 1)
  }

  render() {
    return (
      <Draggable draggableId={toString(this.card.id)} index={this.index}>
        {(provided) => (

          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-light mx-1 mb-2" style={{borderRadius: "3px", boxShadow: "0 1px 0 rgba(9,45,66,.25)", padding: "6px 8px 6px"}}
          >
            <span style={{color: "#17394d", fontSize: "14px"}}>{this.card.content}</span>
            <button onClick={this.removeCard}>remove card</button>
            <button onClick={this.renameCard}>rename</button>
            <button onClick={this.migrateCard}>migrate</button>
          </div>
        )}

      </Draggable>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCard: (cardId, listId) => {dispatch(fetchRemoveCard(cardId, listId))},
    renameCard: (content, cardId, listId) => {dispatch(fetchRenameCard(content, cardId, listId))},
    migrateCard: (cardId, homeListId, targetListId) => {dispatch(fetchMigrateCard(cardId, homeListId, targetListId))}
  }
}

export default connect(null, mapDispatchToProps)(Card)
