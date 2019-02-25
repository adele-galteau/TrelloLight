import * as types from './actionTypes'

export function receiveBoards(boards) {
  return {
    type: types.RECEIVE_BOARDS,
    payload: {
      boards
    }
  }
}

export function addBoard(board) {
  return {
    type: types.ADD_BOARD,
    payload: {
      board
    }
  }
}

export function removeBoard(boardId) {
  return {
    type: types.REMOVE_BOARD,
    payload: {
      boardId
    }
  }
}

export function receiveBoard(board) {
  return {
    type: types.RECEIVE_BOARD,
    payload: {
      board
    }
  }
}

export function receiveCards(cards) {
  return {
    type: types.RECEIVE_CARDS,
    payload: {
      cards
    }
  }
}

export function renameBoard(title, boardId) {
  return {
    type: types.RENAME_BOARD,
    payload: {
      title,
      boardId
    }
  }
}

export function showNewBoardForm() {
  return {
    type: types.SHOW_NEW_BOARD_FORM
  }
}

export function hideNewBoardForm() {
  return {
    type: types.HIDE_NEW_BOARD_FORM
  }
}

export function addCard(card, listId) {
  return {
    type: types.ADD_CARD,
    payload: {
      card,
      listId
    }
  }
}

export function removeCard(cardId, listId) {
  return {
    type: types.REMOVE_CARD,
    payload: {
      cardId,
      listId
    }
  }
}

export function renameCard(content, cardId, listId) {
  return {
    type: types.RENAME_CARD,
    payload: {
      content,
      cardId,
      listId
    }
  }
}

export function editDescription(description, cardId, listId) {
  return {
    type: types.EDIT_CARD_DESCRIPTION,
    payload:{
      description,
      cardId,
      listId
    }
  }
}

export function migrateCard(cardId, targetListId) {
  return {
    type: types.MIGRATE_CARD,
    payload: {
      cardId,
      targetListId
    }
  }
}

export function showDetailedCard(card) {
  return {
    type: types.SHOW_DETAILED_CARD,
    payload: {
      card
    }
  }
}

export function closeDetailedCard() {
  return {
    type: types.CLOSE_DETAILED_CARD
  }
}

export function addList(list) {
  return {
    type: types.ADD_LIST,
    payload: {
      list
    }
  }
}

export function removeList(listId) {
  return {
    type: types.REMOVE_LIST,
    payload: {
      listId
    }
  }
}

export function renameList(title, listId) {
  return {
    type: types.RENAME_LIST,
    payload: {
      title,
      listId
    }
  }
}

export function showListInput(listId) {
  return {
    type: types.SHOW_LIST_INPUT,
    payload: {
      listId
    }
  }
}

export function hideListInput() {
  return {
    type: types.HIDE_LIST_INPUT
  }
}

export function showBoardInput() {
  return {
    type: types.SHOW_BOARD_INPUT
  }
}

export function hideBoardInput() {
  return {
    type: types.HIDE_BOARD_INPUT
  }
}

export function showNewListInput() {
  return {
    type: types.SHOW_NEW_LIST_INPUT
  }
}

export function hideNewListInput() {
  return {
    type: types.HIDE_NEW_LIST_INPUT
  }
}

export function showNewCardInput(listId) {
  return {
    type: types.SHOW_NEW_CARD_INPUT,
    payload: {
      listId
    }
  }
}

export function hideNewCardInput() {
  return {
    type: types.HIDE_NEW_CARD_INPUT
  }
}