import { OrderDetails } from "../types/order-details.type"
import { httpService } from "./http.service"

const BASE_URL = 'order/'

export const orderService = {
    submitOrder,
    getOrders
}

async function submitOrder(order: OrderDetails): Promise<OrderDetails> {
    return await httpService.post(BASE_URL, order)
}

async function getOrders(): Promise<OrderDetails[]> {
    return await httpService.get(BASE_URL)
}
