import { useState } from "react"

import { OrderDetails } from "../../../types/order-details.type"
import OrderAgainModal from "../../modals/order-again-modal"
import Image from "../../image"

interface OrderPreviewProps {
    order: OrderDetails
}

export default function OrderPreview({ order }: OrderPreviewProps) {
    const [isOrderAgainModalOpen, setIsOrderAgainModalOpen] = useState(false)

    const toggleOrderAgainModal = () => setIsOrderAgainModalOpen(!isOrderAgainModalOpen)

    function formatDate(dateStr?: string) {
        if (!dateStr) return ''

        const date = new Date(dateStr)
        const day = padZero(date.getDate())
        const month = padZero(date.getMonth() + 1)
        const year = date.getFullYear()
        const hours = padZero(date.getHours())
        const minutes = padZero(date.getMinutes())

        return `${day}-${month}-${year}, ${hours}:${minutes}`
    }

    function padZero(num: number) {
        return num.toString().padStart(2, '0')
    }

    return (
        <>
            <section className="order-preview" onClick={toggleOrderAgainModal}>
                <h3>{order.bag[0].restaurantName}</h3>
                <div className="container">
                    <p className="date">{formatDate(order.createdAt)}</p>
                    <div className="total-price">
                        <p>₪{order.totalPrice}</p>
                        <Image src="arrow-right.svg" alt="arrow" />
                    </div>
                </div>
            </section>
            {isOrderAgainModalOpen && <OrderAgainModal
                toggleOrderAgainModal={toggleOrderAgainModal}
                isOrderAgainModalOpen={isOrderAgainModalOpen}
                bag={order.bag}
            />}
        </>
    )
}