export const SET_RESTAURANTS = 'SET_RESTAURANTS'
export const SET_RESTAURANT = 'SET_RESTAURANT'
export const ADD_TO_BAG = 'ADD_TO_BAG'
export const REMOVE_FROM_BAG = 'REMOVE_FROM_BAG'
export const CLEAR_BAG = 'CLEAR_BAG'
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS'
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS'

const initialState = {
    restaurants: [],
    restaurant: null,
    shoppingBag: [],
    orderDetails: null,
}

export function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESTAURANTS:
            return { ...state, restaurants: action.restaurants }
        case SET_RESTAURANT:
            return { ...state, restaurant: { ...action.restaurant } }
        case ADD_TO_BAG:
            return { ...state, bag: [...state.bag, action.item] }
        case REMOVE_FROM_BAG:
            return { ...state, bag: state.bag.filter(item => item.id !== action.itemId) }
        case CLEAR_BAG:
            return { ...state, bag: [] }
        case SET_ORDER_DETAILS:
            return { ...state, orderDetails: { ...action.orderDetails } }
        case CLEAR_ORDER_DETAILS:
            return { ...state, orderDetails: null }
        default:
            return state
    }
}