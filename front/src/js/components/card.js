import React from 'react'
import { connect } from 'react-redux'
import { fetchRemoveCard } from '../actions/cards'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.card = this.props.card
    this.removeCard = this.removeCard.bind(this)
  }

  removeCard() {
    console.log("card was removed")
    this.props.removeCard(this.card.id, this.props.listId)
  }

  render() {
    return (
      <div className="bg-light mx-1 mb-2" style={{borderRadius: "3px", boxShadow: "0 1px 0 rgba(9,45,66,.25)", padding: "6px 8px 6px"}}>
        <span style={{color: "#17394d", fontSize: "14px"}}>{this.card.content}</span>
        <button onClick={this.removeCard}>remove card</button>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    removeCard: (cardId, listId) => {dispatch(fetchRemoveCard(cardId, listId))}
  }
}

export default connect(null, mapDispatchToProps)(Card)
