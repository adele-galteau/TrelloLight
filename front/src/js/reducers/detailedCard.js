import { SHOW_DETAILED_CARD } from '../actions/actionTypes'

const initialState = {
    show: false,
    card: {}
}

export const detailedCard = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_DETAILED_CARD:
            return {
                show: true,
                card: action.payload.card
            }

        default:
            return state
    }
}