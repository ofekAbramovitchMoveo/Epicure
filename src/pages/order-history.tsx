import { useEffect } from "react"
import { useSelector } from "react-redux"

import { RootState } from "../store/store"
import OrderList from "../components/order-list"
import { loadOrders } from "../store/order/order.actions"

export default function OrderHistory() {
    const orders = useSelector((storeState: RootState) => storeState.orderModule.orders)
    const user = useSelector((storeState: RootState) => storeState.userModule.user)

    useEffect(() => {
        if (user) loadOrders(user._id || '')
    }, [user?._id])

    if (!user) return <h1 className="no-orders">Please log in to view your order history</h1>
    if (!orders?.length && user) return <h1 className="no-orders">No orders found</h1>
    return (
        <section className="order-history">
            <h1>Your order history</h1>
            <OrderList orders={orders} />
        </section>
    )
}