import { orderService } from "../../services/order.service"
import { OrderDetails } from "../../types/order-details.type"
import { SET_ORDER, SET_ORDERS, TOGGLE_CHECKOUT_SUCCESS } from "./order.reducer"
import { store } from "../store"

export async function submitOrder(newOrder: OrderDetails) {
    try {
        const order = await orderService.submitOrder(newOrder)
        store.dispatch({ type: SET_ORDER, order })
        return order
    } catch (err) {
        console.log('OrderActions: err in submitOrder', err)
        throw err
    }
}

export async function loadOrders() {
    try {
        const orders = await orderService.getOrders()
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.log('OrderActions: err in loadOrders', err)
    }
}

export function toggleCheckoutSuccess() {
    store.dispatch({ type: TOGGLE_CHECKOUT_SUCCESS })
}
