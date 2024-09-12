import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import { REMOVE_FROM_BAG } from "../store/restaurant/restaurant.reducer"
import BagDishPreview from "./dish/bag-dish-preview"
import { BagDish } from "../types/dish.type"
import SignInModal from "./sign-in/sign-in-modal"
import { RootState } from "../store/store"
import { toggleSignInModal } from "../store/user/user.actions"
import { SET_HEADER } from "../store/user/user.reducer"

import bagModal from '/imgs/bag-modal.svg'

interface ShoppingBagProps {
    bag: BagDish[]
    toggleBag: () => void
}

export default function ShoppingBag({ bag, toggleBag }: ShoppingBagProps) {
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const isSignInModalOpen = useSelector((storeState: RootState) => storeState.userModule.isSignInModalOpen)
    const isHeader = useSelector((storeState: RootState) => storeState.userModule.isHeader)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })


    function onRemoveDish(dishId: string) {
        dispatch({ type: REMOVE_FROM_BAG, dishId })
    }

    function onCheckout() {
        dispatch({ type: SET_HEADER, isHeader: false })
        if (!user) toggleSignInModal()
        else {
            navigate('/checkout')
            toggleBag()
        }
    }

    if (!bag?.length) return (
        <>
            <div className="empty-bag">
                <img src={bagModal} alt="" />
                <h4>YOUR BAG IS <br /> EMPTY</h4>
            </div>
            <Link onClick={toggleBag} className="order-btn" to='/order-history'>ORDER HISTORY</Link>
        </>
    )
    return (
        <>
            <section className="shopping-bag">
                <h1>{`${isMobile ? 'MY' : 'YOUR'} ORDER`}</h1>
                <h3 className="restaurant-name">{bag[0].restaurantName}</h3>
                <ul className="bag-dish-list">
                    {bag.map((dish, idx) => (
                        <li key={idx}>
                            <BagDishPreview dish={dish} onRemoveDish={onRemoveDish} />
                        </li>
                    ))}
                </ul>
                <div className="price-container">
                    <hr className="line" />
                    <span className="price">
                        {isMobile && <span className="total">TOTAL - </span>}
                        ₪{bag.reduce((acc, dish) => (
                            acc + (dish.price * (dish.quantity || 1))
                        ), 0)}
                    </span>
                    <hr className="line" />
                </div>
                <label>
                    Add A Comment
                    <textarea rows={8} placeholder="Special requests, allergies, detary restrictions, etc." />
                </label>
                <div className="btns">
                    <button onClick={onCheckout} className="checkout-btn">CHECKOUT</button>
                    <Link onClick={toggleBag} className="order-btn" to='/order-history'>ORDER HISTORY</Link>
                </div>
            </section>
            {isSignInModalOpen && <SignInModal isOpen={isSignInModalOpen} toggleModal={toggleSignInModal} isHeader={isHeader} />}
        </>
    )
}