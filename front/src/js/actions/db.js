import 'whatwg-fetch'
import { push } from 'connected-react-router'

class DB {
  constructor() {
    this.url = 'http://localhost:5000'
    this.contentType = { 'Content-Type': 'application/json'}
  }

  _headers() {
    return {
      ...this.contentType, 'X-Authenticate': this._getToken()
    }
  }

  _json(resp) {
    return resp.json()
  }

  _getToken() {
    return localStorage.getItem("token")
  }

  _setToken(token) {
    return localStorage.setItem("token", token)
  }

  _removeToken() {
    return localStorage.removeItem("token")
  }

  _status(resp) {
    if (resp.status >= 200 && resp.status < 300) {
      return Promise.resolve(resp)
    }

    else if (resp.status == 401 || resp.status == 403) {
      return Promise.reject(new Error(resp.statusText))
    }

    else {
      Promise.reject(new Error(resp.statusText))
    }
  }

  isAuthenticate(dispatch) {
    return fetch(
      this.url + "/token",
      {
        method: "GET",
        headers: this._headers()
      }
    )
      .then(resp => {
        if (resp.status == 401) {
          dispatch(push('/login'))
          this._removeToken()
          return false
        }

        else if (resp.status == 200) {
            return true
        }
      })
  }

  authenticate(username, password) {
    return fetch(
      this.url + "/login",
      {
        method: "POST",
        headers: this.contentType,
        body: JSON.stringify({username, password})
      }
    )
      .then(this._status)
      .then(this._json)
      .then(resp => {
        console.log(resp.token)
        return resp
      })
      .then(resp => this._setToken(resp.token))
  }


  logout() {
    return fetch(
      this.url + '/logout',
      {
        method: "DELETE",
        headers: this._headers()
      }
    )
    .then(this._status)
    .then(this._removeToken())
  }

  isAuthenticate() {
    const token = this._getToken()

    if (token) {
      return true
    } else {
      return false
    }
  }
}


export const db = new DB()
