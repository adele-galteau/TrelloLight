import React from 'react'
import { logout } from '../actions/logout'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logout()
  }

  render() {
    return (
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand d-flex justify-content-between px-1" style={{height: "40px", background:"#026aa7"}}>

          <button className="btn btn-sm text-light mr-1" style={{background: "hsl(202, 48%, 53%)", padding: "4px 6px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" style={{fill: "#f8f9fa"}}><path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/></svg>
          </button>

          <a className="navbar-brand" style={{cursor: "pointer", fontWeight: "bold", color: "hsl(202, 49%, 66%)"}}>TrelloLight</a>

          <button onClick={this.logout} className="btn btn-sm text-light  " style={{background: "hsl(202, 48%, 53%)", fontWeight: "bold"}}>
            Logout
          </button>


        </nav>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      // dispatch(logout())
      dispatch(push('/login'))
    }
  }
}

export default connect(null, mapDispatchToProps)(Navbar)
