import React from 'react'

class Board extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="p-2 text-light" style={{background: "rgb(0, 121, 191)", fontWeight: "700", borderRadius: "3px", cursor: "pointer"}}>
        <div className="" style={{height: "80px"}}>
          <p>{this.props.board.title}</p>
        </div>
      </div>
    )
  }
}

export default Board
