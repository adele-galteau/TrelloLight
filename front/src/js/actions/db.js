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


  authenticate(username, password, dispatch) {
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
        this._setToken(resp.token)
        dispatch(push('/boards'))
      })
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

  isAuthenticate(dispatch) {
    const token = this._getToken()

    if (token) {
      return true
    } else {
      return false
    }
  }

  fetchBoards() {
    return fetch(
      this.url + '/boards',
      {
        method: "GET",
        headers: this._headers()
      }
    )
      .then(this._status)
      .then(this._json)
  }

  fetchBoard(board_id) {
    return fetch(
      this.url + '/board/' + board_id,
      {
        method: "GET",
        headers: this._headers()
      }
    )
      .then(this._status)
      .then(this._json)
      .then(resp => {
        console.log(resp)
        return resp
      })
  }

  addBoard(boardTitle) {
    return fetch(
      this.url + '/board',
      {
        method: "POST",
        headers: this._headers(),
        body: JSON.stringify({
          "title": boardTitle
        })
      }
    )
      .then(this._status)
      .then(this._json)
  }

  removeBoard(boardId) {
    return fetch(
      this.url + '/board/' + boardId,
      {
        method: "DELETE",
        headers: this._headers()
      }
    )
      .then(this._status)
      .then(this._json)
      .then(resp => {
        console.log(resp)
        return resp
      })

  }
}

export const db = new DB()
