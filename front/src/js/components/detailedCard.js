import React from 'react'
import { connect } from 'react-redux'
import { renameCard, editDescription } from '../actions/cards'
import { closeDetailedCard } from '../actions/actionCreators'

class DetailedCard extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            showContentInput: false,
            showDescriptionInput: false,
            content: "",
            description: ""
        }
        
        this.showContentInput = this.showContentInput.bind(this)
        this.showDescriptionInput = this.showDescriptionInput.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onChangeDescripton = this.onChangeDescripton.bind(this)
        this.renameCard = this.renameCard.bind(this)
        this.editDescription = this.editDescription.bind(this)
        this.hideInputs = this.hideInputs.bind(this)
        this.closeDetailedCard = this.closeDetailedCard.bind(this)

        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 27) {
                this.props.closeDetailedCard()
            }
        })
    }

    showContentInput() {
        this.setState({
          showContentInput: true
        })
    }

    showDescriptionInput() {
        this.setState({
            showDescriptionInput: true
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
                showContentInput: false
            })
    
            const content = this.state.content
    
            if (content != null && content.trim()) {
                this.props.renameCard(content, this.props.card.id, this.props.card.List)
            }
        }
      }
    
    editDescription() {
        this.setState({
            showDescriptionInput: false
        })

        const description = this.state.description

        if (description != null && description.trim()) {
            this.props.editDescription(description, this.props.card.id, this.props.card.List)
        }
    } 

    hideInputs(e) {
        const exceptions = ".hide-input-exception"

        if (!e.target.matches(exceptions)) {
            this.setState({
                showContentInput:false,
                showDescriptionInput: false
            })
        }
    }

    closeDetailedCard(e) {
        const exceptions = ".hide-input-exception, .close-detailed-card-exception"

        if (!e.target.matches(exceptions)) {
            this.props.closeDetailedCard()
        }
    }

    render() {
        return (
            <div onClick={this.closeDetailedCard} className="container-fluid" style={{background: "rgba(0, 0, 0, 0.64)", zIndex:"0", position: "absolute", top: "0", bottom: "0"}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div onClick={this.hideInputs} className="close-detailed-card-exception mt-5" style={{borderRadius: "3px", background: "rgb(223, 227, 230)", paddingBottom: "17px"}}>
                            <div className="close-detailed-card-exception" style={{padding: "12px 40px 25px 56px"}}>
                                {
                                    this.state.showContentInput ?
                                        <input id="detailed-card-content-input" className="hide-input-exception form-control form-control-sm" onChange={this.onChangeContent} onKeyDown={this.renameCard} placeholder={this.props.card.content}></input>
                                    :
                                        <h1 className="hide-input-exception" onClick={this.showContentInput} style={{fontSize: "20px", fontWeight: "700", color: "#17394d", margin: "0"}}>{this.props.card.content}</h1>
                                }
                                <p className="close-detailed-card-exception" style={{color: "#6b808c", margin: "0", fontSize: "14px", fontWeight: "400"}}>in list {this.props.list.title}</p>
                            </div>
                            
                            <div className="close-detailed-card-exception" style={{padding: "0 40px 8px 56px"}}>
                                <h2 className="close-detailed-card-exception" style={{fontSize: "16px", fontWeight: "700", color: "#17394d", marginBottom: "12px"}}>Description</h2>
                                
                                {
                                    this.state.showDescriptionInput ?
                                       (
                                        <div className="close-detailed-card-exception">
                                            <textarea id="detailed-card-description-textarea" className="hide-input-exception" onChange={this.onChangeDescripton} placeholder={this.props.card.description}></textarea>
                                            <button className="hide-input-exception" onClick={this.editDescription}>Save</button>
                                        </div>
                                       )
                                    :
                                        <div className="close-detailed-card-exception" onClick={this.showDescriptionInput} style={{borderRadius: "3px", background: "rgba(9,45,66,.08)"}}>
                                            <p className="hide-input-exception" style={{color: "#6b808c", fontSize: "14px", margin: "0", height: "54px", padding: "7px 9px"}}>
                                                {this.props.card.description ? this.props.card.description : "Add a more detailed description..."}
                                            </p>
                                        </div>
                                }
                                
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
      card: state.detailedCard.card,
      list: state.currentLists.filter(list => list.id != state.detailedCard.card.List)[0]
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        renameCard: (content, cardId, listId) => {dispatch(renameCard(content, cardId, listId))},
        editDescription: (description, cardId, listId) => {dispatch(editDescription(description, cardId, listId))},
        closeDetailedCard: () => {dispatch(closeDetailedCard())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedCard)