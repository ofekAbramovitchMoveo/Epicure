import { Action } from "redux"

import { BagDish } from "../../types/dish.type"
import { Restaurant } from "../../types/restaurant.type"

export const SET_RESTAURANTS = 'SET_RESTAURANTS'
export const SET_RESTAURANT = 'SET_RESTAURANT'
export const ADD_TO_BAG = 'ADD_TO_BAG'
export const REMOVE_FROM_BAG = 'REMOVE_FROM_BAG'
export const CLEAR_BAG = 'CLEAR_BAG'
export const TOGGLE_BAG_MODAL = 'TOGGLE_BAG_MODAL'
export const UPDATE_DISH_QUANTITY = 'UPDATE_DISH_QUANTITY'

type RestaurantAction = Action & {
    restaurants?: Restaurant[]
    restaurant?: Restaurant
    dish?: BagDish
    dishId?: string
    quantity?: number
}

const initialState: {
    restaurants: Restaurant[],
    restaurant: Restaurant | null,
    bag: BagDish[],
    isBagOpen: boolean,
} = {
    restaurants: [],
    restaurant: null,
    bag: [],
    isBagOpen: false,
}

export function restaurantReducer(state = initialState, action: RestaurantAction) {
    switch (action.type) {
        case SET_RESTAURANTS:
            return { ...state, restaurants: action.restaurants }
        case SET_RESTAURANT:
            return { ...state, restaurant: { ...action.restaurant } }
        case ADD_TO_BAG:
            return { ...state, bag: [...state.bag, action.dish] }
        case REMOVE_FROM_BAG:
            return { ...state, bag: state.bag.filter(dish => dish._id !== action.dishId) }
        case CLEAR_BAG:
            return { ...state, bag: [] }
        case TOGGLE_BAG_MODAL:
            return { ...state, isBagOpen: !state.isBagOpen }
        case UPDATE_DISH_QUANTITY:
            return {
                ...state,
                bag: state.bag.map(dish =>
                    dish._id === action.dishId ? { ...dish, quantity: action.quantity } : dish
                )
            }
        default:
            return state
    }
}