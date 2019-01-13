import React from 'react'
import { logout } from '../actions/logout'
import { connect } from 'react-redux'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  logout() {
    this.props.logout()
  }

  render() {
    return <h1 onClick={this.logout.bind(this)} >Home component!</h1>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {dispatch(logout())}
  }
}

export default connect(null, mapDispatchToProps)(Home)
