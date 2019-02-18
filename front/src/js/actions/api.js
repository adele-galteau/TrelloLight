import 'whatwg-fetch'

class API {
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

  login(username, password) {
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
      this.url + '/list?board_id=' + boardId,
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

  fetchCards(board_id) {
    return fetch(
      this.url + '/cards?board_id=' + board_id,
      {
        method: "GET",
        headers: this._headers()
      }
    )
      .then(this._status)
      .then(this._json)
  }

  addCard(content, listId) {
    return fetch(
      this.url + '/card?list_id='+ listId,
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

  editDescription(description, cardId) {
    return fetch(
      this.url + '/card/' + cardId,
      {
        method: "PUT",
        headers: this._headers(),
        body: JSON.stringify({
          "description": description
        })
      }
    )
      .then(this._status)
      .then(this._json)
      .then(resp => {
        return resp
      })
  }

  migrateCard(cardId, targetListId) {
    return fetch(
      this.url + '/card?card_id=' + cardId + "&&target_listId=" + targetListId,
      {
        method: "PUT",
        headers: this._headers(),
      }
    )
      .then(this._status)
      .then(this._json)
      .then(resp => {
        return resp
      })
  }
}

export const api = new API()
