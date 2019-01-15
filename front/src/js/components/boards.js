import React from 'react'
import Navbar from './navbar'
import BoardTile from './boardTile'
import { v4 as uuid4 } from 'uuid'
import { connect } from 'react-redux'
import { fetchBoards } from '../actions/boards'

class Boards extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("BOARDS MOUTED")
    this.props.fetchBoards()
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />

        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col">
              <p className="ml-3 mb-3" style={{color: "#17394d", fontWeight: "700"}}>My Boards</p>

              <div className="row">

              {
                this.props.boards.map(board => (
                    <BoardTile key={uuid4()} board={board}/>
                ))
              }

                <div className="col-6">
                  <div className="d-flex justify-content-center align-items-center" style={{background:"rgba(9,45,66,.08)", borderRadius: "3px", height: "100%", cursor: "pointer"}}>
                    <p style={{color: "#6b808c", fontSize: "14px"}}>Create new board...</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => {dispatch(fetchBoards())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards)
