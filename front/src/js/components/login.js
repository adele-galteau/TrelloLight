import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/login'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.login = this.login.bind(this)
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  login(e) {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }


  render() {
    return (
      <div style={{maxWidth: "350px"}} className="container-fluid">
        <div className="row">
          <form className="col-sm-12 mt-5">
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            <div className="form-group">
              <input onChange={this.onChangeUsername} className="form-control" type="text" minLength="1" maxLength="80" required={true} placeholder="Username"/>
              <input onChange={this.onChangePassword} className="form-control" type="password" minLength="1" maxLength="80" required={true} placeholder="Password"/>
            </div>
            <button onClick={this.login} type='submit' className="btn btn-success btn-block">Login</button>

          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {dispatch(login(username, password))}
  }
}

export default connect(null, mapDispatchToProps)(Login)
