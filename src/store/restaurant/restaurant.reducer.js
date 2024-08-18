export const SET_RESTAURANTS = 'SET_RESTAURANTS'
export const SET_RESTAURANT = 'SET_RESTAURANT'

const initialState = {
    restaurants: [],
    restaurant: null,
}

export function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESTAURANTS:
            return { ...state, restaurants: action.restaurants }
        case SET_RESTAURANT:
            return { ...state, restaurant: { ...action.restaurant } }
        default:
            return state
    }
}