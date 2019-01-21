import 'whatwg-fetch'
import { push, replace } from 'connected-react-router'

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

  removeToken() {
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
    if (this._getToken()) {
      return true
    } else {
      dispatch(replace('/login'))
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
      .then(this.removeToken())
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


  fetchBoard(boardId) {
    return fetch(
      this.url + '/board/' + boardId,
      {
        method: "GET",
        headers: this._headers()
      }
    )
      .then(this._status)
      .then(this._json)
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
  }


  renameBoard(title, boardId) {
    return fetch(
      this.url + '/board/' + boardId,
      {
        method: "PUT",
        headers: this._headers(),
        body: JSON.stringify({
          "title": title
        })
      }
    )
      .then(this._status)
      .then(this._json)
  }


  addList(title, boardId) {
    return fetch(
      this.url + '/list/' + boardId,
      {
        method: "POST",
        headers: this._headers(),
        body: JSON.stringify({
          "title": title
        })
      }
    )
    .then(this._status)
    .then(this._json)
  }


  removeList(listId) {
    return fetch(
      this.url + '/list/' + listId,
      {
        method: "DELETE",
        headers: this._headers()
      }
    )
      .then(this._status)
      .then(this._json)
  }


  renameList(title, listId) {
    return fetch(
      this.url + '/list/' + listId,
      {
        method: "PUT",
        headers: this._headers(),
        body: JSON.stringify({
          "title": title
        })
      }
    )
      .then(this._status)
      .then(this._json)
  }

  addCard(content, listId) {
    return fetch(
      this.url + '/card/'+ listId,
      {
        method: "POST",
        headers: this._headers(),
        body: JSON.stringify({
          "content": content
        })
      }
    )
      .then(this._status)
      .then(this._json)
  }


  removeCard(cardId) {
    return fetch(
      this.url + '/card/' + cardId,
      {
        method: "DELETE",
        headers: this._headers()
      }
    )
      .then(this._status)
      .then(this._json)
  }


  renameCard(content, cardId) {
    return fetch(
      this.url + '/card/' + cardId,
      {
        method: "PUT",
        headers: this._headers(),
        body: JSON.stringify({
          "content": content
        })
      }
    )
      .then(this._status)
      .then(this._json)
  }


  migrateCard(cardId, targetListId) {
    return fetch(
      this.url + '/card/' + cardId + "/" + targetListId,
      {
        method: "PUT",
        headers: this._headers(),
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
