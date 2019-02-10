import { SHOW_DETAILED_CARD } from '../actions/actionTypes'

export const showDetailedCard = (state = false, action) => {
    switch (action.type) {
        case SHOW_DETAILED_CARD:
            return true

        default:
            return state
    }
}