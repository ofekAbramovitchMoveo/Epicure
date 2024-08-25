/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import bagModal from '/imgs/bag-modal.svg'
import BagDishPreview from "./bag-dish-preview"
import { useDispatch } from "react-redux"
import { REMOVE_FROM_BAG } from "../store/restaurant/restaurant.reducer"
import { useMediaQuery } from "react-responsive"


export default function ShoppingBag({ bag, toggleBag }) {
    const dispatch = useDispatch()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    function onRemoveDish(dishId) {
        dispatch({ type: REMOVE_FROM_BAG, dishId })
    }

    if (!bag || !bag.length) return (
        <>
            <div className="empty-bag">
                <img src={bagModal} alt="" />
                <h4>YOUR BAG IS <br /> EMPTY</h4>
            </div>
            <Link onClick={toggleBag} className="order-btn" to='/order-history'>ORDER HISTORY</Link>
        </>
    )
    return (
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
                <Link onClick={toggleBag} className="checkout-btn" to='/checkout'>CHECKOUT</Link>
                <Link onClick={toggleBag} className="order-btn" to='/order-history'>ORDER HISTORY</Link>
            </div>
        </section>
    )
}