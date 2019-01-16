import React from 'react'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.card = this.props.card
  }

  render() {
    console.log("CARD", this.card)
    return (
      <div className="bg-light mx-1 mb-2" style={{borderRadius: "3px", boxShadow: "0 1px 0 rgba(9,45,66,.25)", padding: "6px 8px 6px"}}>
        <span style={{color: "#17394d", fontSize: "14px"}}>{this.card.content}</span>
      </div>
    )
  }

}

export default Card
