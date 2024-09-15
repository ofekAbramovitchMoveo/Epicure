import { Action } from 'redux'

import { OrderDetails } from '../../types/order-details.type'

export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'

type OrderAction = Action & {
    orders?: OrderDetails[]
    order?: OrderDetails | null
}

const initialState: {
    orders?: OrderDetails[]
    order?: OrderDetails | null
} = {
    orders: [],
    order: null
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
        default: return state
    }

    return newState
}