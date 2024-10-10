import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { RootState } from "../../store/store"
import { setBag, toggleBag } from "../../store/restaurant/restaurant.actions"
import { BagDish } from "../../types/dish.type"

interface OrderAgainShoppingBagBtnsProps {
    bag: BagDish[]
}

export default function OrderAgainShoppingBagBtns({ bag }: OrderAgainShoppingBagBtnsProps) {
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const navigate = useNavigate()

    function onCheckout() {
        navigate('/checkout')
        if (isBagOpen) toggleBag()
        else setBag(bag)
    }

    return (
        <div className="btns">
            <button onClick={onCheckout} className="checkout-btn">
                {isBagOpen ? 'CHECKOUT' : 'ORDER AGAIN'}
            </button>
            <Link className="order-btn" to='/order-history'>ORDER HISTORY</Link>
        </div>
    )
}