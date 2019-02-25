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
      <div style={{maxWidth: "430px"}} className="container">
        <div className="row justify-content-center">
          <div className="col mt-5">
            <form className="mt-1 mb-4">
              <h1 style={{fontSize: "38px", fontWeight: "700", color: "#333", marginBottom: "20px"}}>Log in to TrelloLight</h1>
              <div className="form-group">
                <label style={{fontSize: "16px", fontWeight: "300", color: "#4d4d4d"}}>Username</label>
                <input onChange={this.onChangeUsername} className="form-control mb-3 bg-light" type="text" minLength="1" maxLength="80" required={true}/>

                <label>Password</label>
                <input onChange={this.onChangePassword} className="form-control mb-3 bg-light" type="password" minLength="1" maxLength="80" required={true}/>
              </div>
              <button onClick={this.login} type='submit' className="btn btn-block"style={{fontWeight: "700", boxShadow: "0 2px 0 #3F6F21", background: "#61BD4F", color: "white"}}>Log In</button>
            </form>

            <div className="bg-light pt-2 pl-3 pb-1" style={{textAlign: "center", borderRadius: "3px", boxShadow: "0 1px 0 rgba(9,45,66,.25)"}}>
              <p style={{color: "#4d4d4d", fontWeight: "700"}}>Enter as a visitor:</p>
              <p style={{color: "#4d4d4d"}}>
                Username: simon <br/>
                Password: simon_pass 
              </p>
              <p style={{color: "#4d4d4d", fontWeight: "700"}}>Visit my&nbsp;
              <a href="https://github.com/adele-galteau/TrelloLight" target="_blank">Github</a>
              &nbsp;and&nbsp;
              <a href="https://www.linkedin.com/in/ad%C3%A8le-galteau-5a6479161/" target="_blank">Linkedin</a>
              </p>
              
            </div>
          </div>
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
