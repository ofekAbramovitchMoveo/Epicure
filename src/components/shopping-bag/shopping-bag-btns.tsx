import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import Image from "../image"
import { RootState } from "../../store/store"
import { SET_HEADER } from "../../store/user/user.reducer"
import { toggleSignInModal } from "../../store/user/user.actions"
import { setBag, toggleBag } from "../../store/restaurant/restaurant.actions"
import { BagDish } from "../../types/dish.type"

interface ShoppingBagBtnsProps {
    isDisabled?: boolean
    isBagOpen?: boolean
    onOrderHistory?: () => void
}

export default function ShoppingBagBtns({ isDisabled, isBagOpen, onOrderHistory }: ShoppingBagBtnsProps) {
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onCheckout() {
        dispatch({ type: SET_HEADER, isHeader: false })

        if (!user) toggleSignInModal()
        else {
            navigate('/checkout')
            if (isBagOpen) toggleBag()
        }
    }

    return (
        <div className="btns">
            <button onClick={onCheckout} className={`checkout-btn ${isDisabled ? 'disabled' : ''}`}
                disabled={isDisabled}
            >
                CHECKOUT
            </button>
            <Link onClick={onOrderHistory} className="order-btn" to='/order-history'>ORDER HISTORY</Link>
        </div>
    )
}