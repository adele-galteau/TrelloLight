import React from 'react'
import { connect } from 'react-redux'
import { renameCard, editDescription } from '../actions/cards'

class DetailedCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: "",
            description: ""
        }

        this.card = this.props.card
        this.renameCard = this.renameCard.bind(this)
        this.editDescription = this.editDescription.bind(this)
        this.showInput = this.showInput.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
    }

    showInput() {
        this.setState({
          showInput: true
        })
      }
    
    onChangeContent(e) {
        this.setState({
            content: e.target.value
        })
    }

    onChangeDescripton(e) {
        this.setState({
            description: e.target.value
        })
    }

    renameCard(e) {
        if (e.keyCode == 13) {
          this.setState({
            showInput: false,
            showDetailedCard: false
          })
    
          const content = this.state.content
    
          if (content != null && content.trim()) {
            this.props.renameCard(content, this.card.id, this.card.List)
          }
        }
      }
    
    editDescription() {
        const description = window.prompt("", "")

        if (description != null && description.trim()) {
            this.props.editDescription(description, this.card.id, this.card.List)
        }
    } 

    render() {
        return (
            <div className="container-fluid" style={{background: "rgba(0, 0, 0, 0.64)", zIndex:"0", position: "absolute", top: "0", bottom: "0"}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mt-5" style={{borderRadius: "3px", background: "rgb(223, 227, 230)", paddingBottom: "17px"}}>
                            <div style={{padding: "12px 40px 25px 56px"}}>
                                {
                                    this.state.showInput ?
                                        <input onChange={this.onChangeContent} onKeyDown={this.renameCard} placeholder={this.card.content} className="form-control form-control-sm"></input>
                                    :
                                        <h1 onClick={this.showInput} style={{fontSize: "20px", fontWeight: "700", color: "#17394d", margin: "0"}}>{this.card.content}</h1>
                                }
                                <p style={{color: "#6b808c", margin: "0", fontSize: "14px", fontWeight: "400"}}>in list Prout</p>
                            </div>
                            
                            <div style={{   padding: "0 40px 8px 56px"}}>
                                <h2 style={{fontSize: "16px", fontWeight: "700", color: "#17394d", marginBottom: "12px"}}>Description</h2>
                                <div style={{borderRadius: "3px", background: "rgba(9,45,66,.08)"}}>
                                    <p style={{color: "#6b808c", fontSize: "14px", margin: "0", height: "54px", padding: "7px 9px"}}>Add a more detailed description...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
      card: state.detailedCard.card
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        renameCard: (content, cardId, listId) => {dispatch(renameCard(content, cardId, listId))},
        editDescription: (description, cardId, listId) => {dispatch(editDescription(description, cardId, listId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedCard)