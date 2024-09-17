import { OrderDetails } from "../types/order-details.type"
import OrderPreview from "./order-preview"

interface OrderListProps {
    orders: OrderDetails[]
}

export default function OrderList({ orders }: OrderListProps) {
    return (
        <ul className="order-list">
            {orders.map(order => (
                <li key={order._id}>
                    <OrderPreview order={order} />
                </li>
            ))}
        </ul>
    )
}