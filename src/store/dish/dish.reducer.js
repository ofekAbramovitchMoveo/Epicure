export const SET_DISHES = 'SET_DISHES'

const initialState = {
    dishes: [],
}


export function dishReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DISHES:
            return { ...state, dishes: action.dishes }
        default:
            return state
    }
}