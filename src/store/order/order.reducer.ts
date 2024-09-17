import { Action } from 'redux'

import { OrderDetails } from '../../types/order-details.type'

export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const TOGGLE_CHECKOUT_SUCCESS = 'TOGGLE_CHECKOUT_SUCCESS'

type OrderAction = Action & {
    orders?: OrderDetails[]
    order?: OrderDetails | null
    isCheckoutSuccessOpen?: boolean
}

const initialState: {
    orders?: OrderDetails[]
    order?: OrderDetails | null
    isCheckoutSuccessOpen?: boolean
} = {
    orders: [],
    order: null,
    isCheckoutSuccessOpen: false
}

export function orderReducer(state = initialState, action: OrderAction) {
    var newState = state
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        case SET_ORDER:
            newState = { ...state, order: action.order }
            break
        case TOGGLE_CHECKOUT_SUCCESS:
            newState = { ...state, isCheckoutSuccessOpen: !state.isCheckoutSuccessOpen }
            break
        default: return state
    }

    return newState
}