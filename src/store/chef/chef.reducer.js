export const SET_CHEFS = 'SET_CHEFS'

const initialState = {
    chefs: [],
}


export function chefReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHEFS:
            return { ...state, chefs: action.chefs }
        default:
            return state
    }
}