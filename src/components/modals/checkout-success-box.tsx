import Image from "../image"
import { OrderDetails } from "../../types/order-details.type"

interface CheckoutSuccessBoxProps {
    toggleCheckoutSuccess: () => void
    order: OrderDetails | null
}

export default function CheckoutSuccessBox({ toggleCheckoutSuccess, order }: CheckoutSuccessBoxProps) {
    return (
        <>
            <Image src="close-white.svg" alt="close" className="close-icon" onClick={toggleCheckoutSuccess} />
            <Image src="check.svg" alt="check" />
            <div className="title-container">
                <h1>ORDER RECEIVED</h1>
                <p>Your food is in process</p>
            </div>
            <div className="time-estimation">
                <p>Arrives in <span>90:00</span> min</p>
            </div>
            <div className="dishes">
                {order?.bag.map(dish => (
                    <div className="dish" key={dish.bagDishId}>
                        <p className="dish-info">{dish.quantity}x <span>{dish.name}</span></p>
                        <p className="dish-price">₪{dish.price}</p>
                    </div>
                ))}
            </div>
            <div className="total-price">
                <p>TOTAL - <span>₪{order?.totalPrice}</span></p>
            </div>
        </>
    )
}