import { Action } from "redux"

import { BagDish } from "../../types/dish.type"
import { Restaurant } from "../../types/restaurant.type"
import { utilService } from "../../services/util.service"

export const SET_RESTAURANTS = 'SET_RESTAURANTS'
export const SET_RESTAURANT = 'SET_RESTAURANT'
export const ADD_TO_BAG = 'ADD_TO_BAG'
export const REMOVE_FROM_BAG = 'REMOVE_FROM_BAG'
export const CLEAR_BAG = 'CLEAR_BAG'
export const TOGGLE_BAG_MODAL = 'TOGGLE_BAG_MODAL'
export const UPDATE_DISH_QUANTITY = 'UPDATE_DISH_QUANTITY'
export const SET_BAG = 'SET_BAG'
export const SET_WARNING_POPUP = 'SET_WARNING_POPUP'

type RestaurantAction = Action & {
    restaurants?: Restaurant[]
    restaurant?: Restaurant
    dish?: BagDish
    dishId?: string
    quantity?: number
    bag?: BagDish[]
    isWarningPopupOpen?: boolean
}

const initialState: {
    restaurants: Restaurant[],
    restaurant: Restaurant | null,
    bag: BagDish[],
    isBagOpen: boolean,
    isWarningPopupOpen: boolean
} = {
    restaurants: [],
    restaurant: null,
    bag: [],
    isBagOpen: false,
    isWarningPopupOpen: false
}

export function restaurantReducer(state = initialState, action: RestaurantAction) {
    switch (action.type) {
        case SET_RESTAURANTS:
            return { ...state, restaurants: action.restaurants }
        case SET_RESTAURANT:
            return { ...state, restaurant: { ...action.restaurant } }
        case ADD_TO_BAG:
            const existingDishIndex = state.bag.findIndex(dish =>
                dish._id === action.dish?._id &&
                JSON.stringify(dish.sideDish) === JSON.stringify(action.dish?.sideDish) &&
                utilService.areArraysEqual(dish.changes || [], action.dish?.changes || [])
            )
            if (existingDishIndex !== -1) {
                return {
                    ...state,
                    bag: state.bag.map((dish, index) =>
                        index === existingDishIndex
                            ? { ...dish, quantity: (dish.quantity || 0) + (action.dish?.quantity || 1) }
                            : dish
                    )
                };
            } else {
                const newDish = action.dish ? {
                    ...action.dish,
                    bagId: `${action.dish._id}_${Date.now()}`,
                    quantity: action.dish.quantity || 1
                } : null;
                return { ...state, bag: newDish ? [...state.bag, newDish] : state.bag }
            }
        case REMOVE_FROM_BAG:
            return { ...state, bag: state.bag.filter(dish => dish.bagId !== action.dishId) }
        case CLEAR_BAG:
            return { ...state, bag: [] }
        case TOGGLE_BAG_MODAL:
            return { ...state, isBagOpen: !state.isBagOpen }
        case UPDATE_DISH_QUANTITY:
            return {
                ...state,
                bag: state.bag.map(dish =>
                    dish.bagId === action.dishId ? { ...dish, quantity: action.quantity } : dish
                )
            }
        case SET_BAG:
            return { ...state, bag: action.bag }
        case SET_WARNING_POPUP:
            return { ...state, isWarningPopupOpen: action.isWarningPopupOpen }
        default:
            return state
    }
}