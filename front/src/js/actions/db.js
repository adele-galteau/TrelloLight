import 'whathg-fetch'
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

  _setToken() {
    return localStorage.setItem("token")
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

  authenticate(username, password) {
    return fetch(
      this.url + "/login",
      {
        method: "POST",
        headers: this._headers(),
        body: JSON.stringify({username, password})
      }
    )
      .then(this._status)
      .then(this._json)
      .then(resp => this._setToken(resp.token))
  }
}
