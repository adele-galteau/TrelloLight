import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux'
import { removeCard } from '../actions/cards'
import { showDetailedCard } from '../actions/actionCreators'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInput: false
    }

    this.card = this.props.card
    this.index = this.props.index
    this.listId = this.props.listId
    this.removeCard = this.removeCard.bind(this)
    this.showDetailedCard = this.showDetailedCard.bind(this)
  }


  removeCard() {
    this.props.removeCard(this.card.id, this.listId)
  }


  showDetailedCard() {
    this.props.showDetailedCard(this.card)
  }


  render() {
    return (
      <Draggable draggableId={this.card.id} index={this.index}>
        {(provided) => (

          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >

            <div onClick={this.showDetailedCard} className="bg-light mx-1 mb-2" style={{borderRadius: "3px", boxShadow: "0 1px 0 rgba(9,45,66,.25)", padding: "6px 8px 6px"}}>
              <div className="d-flex justify-content-between">
                
                <p style={{paddingTop:"4px", color: "#17394d", cursor: "text", fontSize: "14px", marginBottom: "0"}}>
                {this.card.content}
                </p>

                <div className="dropdown">
                  <button className="btn btn-sm dropdown-toggle pt-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                  <div className="dropdown-menu pt-1 pb-1" aria-labelledby="dropdownMenuButton">
                    <a onClick={this.removeCard} className="dropdown-item" style={{color: "#17394d", cursor: "text", fontSize: "14px", cursor:"pointer"}}>Delete this card</a>
                  </div>
                </div>
                
              </div>
            </div>

          </div>
        )}

      </Draggable>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCard: (cardId, listId) => {dispatch(removeCard(cardId, listId))},
    showDetailedCard: (card) => {dispatch(showDetailedCard(card))}
  }
}

export default connect(null, mapDispatchToProps)(Card)
