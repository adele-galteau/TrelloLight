import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class BoardTile extends React.Component {
  constructor(props) {
    super(props)

    this.getLists = this.getLists.bind(this)
  }

  getLists(boardId) {
    this.props.getLists(this.props.board.id)
  }

  render() {
    return (
      <div className="col-6">
        <div onClick={this.getLists} className="p-2 mb-3 text-light" style={{background: "rgb(0, 121, 191)", fontWeight: "700", borderRadius: "3px", cursor: "pointer"}}>
          <div className="" style={{height: "80px"}}>
            <p>{this.props.board.title}</p>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
      getLists: (boardId) => {dispatch(push('/board/' + boardId))}
  }
}

export default connect(null, mapDispatchToProps)(BoardTile)
