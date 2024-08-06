export const SET_RESTAURANTS = 'SET_RESTAURANTS'

const initialState = {
    restaurants: [],
}


export function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESTAURANTS:
            return { ...state, restaurants: action.restaurants }
        default:
            return state
    }
}