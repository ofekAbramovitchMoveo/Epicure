import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import BagDishPreview from "./dish/bag-dish-preview"
import { BagDish } from "../types/dish.type"
import SignInModal from "./sign-in/sign-in-modal"
import { RootState } from "../store/store"
import { toggleSignInModal } from "../store/user/user.actions"
import { SET_HEADER } from "../store/user/user.reducer"
import { clearBag, removeFromBag } from "../store/restaurant/restaurant.actions"
import { submitOrder } from "../store/order/order.actions"
import { DeliveryDetails, OrderDetails, PaymentDetails } from "../types/order-details.type"

import bagModal from '/imgs/bag-modal.svg'
import lock from '/imgs/lock.svg'

interface ShoppingBagProps {
    bag: BagDish[]
    toggleBag: () => void
    isDisabled?: boolean
    deliveryDetails: DeliveryDetails
    paymentDetails: PaymentDetails
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ShoppingBag({ bag, toggleBag, isDisabled, deliveryDetails, paymentDetails, setErrors }: ShoppingBagProps) {
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const isSignInModalOpen = useSelector((storeState: RootState) => storeState.userModule.isSignInModalOpen)
    const isHeader = useSelector((storeState: RootState) => storeState.userModule.isHeader)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isCheckoutPage = location.pathname.includes('/checkout')

    function onRemoveDish(dishId: string) {
        removeFromBag(dishId)
    }

    async function onCheckout() {
        dispatch({ type: SET_HEADER, isHeader: false })

        if (!isCheckoutPage) {
            if (!user) toggleSignInModal()
            else {
                navigate('/checkout')
                toggleBag()
            }
        } else {
            let order: OrderDetails | null = null
            try {
                const orderDetails: OrderDetails = {
                    deliveryDetails,
                    paymentDetails,
                    bag,
                    totalPrice: calcPrice()
                }
                order = await submitOrder(orderDetails)
            } catch (err: any) {
                if (err?.response?.data?.message) {
                    const errorMessages = Array.isArray(err.response.data.message)
                        ? err.response.data.message
                        : [err.response.data.message]
                    setErrors(errorMessages)
                } else {
                    console.log(err.response.data.message)
                    console.log('Error in submitOrder', err)
                }
                return
            }

            if (order) {
                clearBag()
                navigate('/')
            }
        }
    }

    function calcPrice() {
        return bag.reduce((acc, dish) => (
            acc + ((dish.price || 0) * (dish.quantity || 1))
        ), 0)
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
            <section className={`shopping-bag ${isMobile && isCheckoutPage ? 'main-layout' : ''}`}>
                <h1>{`${isMobile ? 'MY' : 'YOUR'} ORDER`}</h1>
                {(!isCheckoutPage || (isCheckoutPage && !isMobile)) && (
                    <h3 className="restaurant-name">{bag[0].restaurantName}</h3>
                )}
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
                        {(!isCheckoutPage || (isCheckoutPage && isMobile)) && `₪${calcPrice()}`}
                    </span>
                    {!isCheckoutPage && <hr className="line" />}
                </div>
                <label>
                    Add A Comment
                    <textarea rows={8} placeholder="Special requests, allergies, detary restrictions, etc." />
                </label>
                <div className="btns">
                    <button onClick={onCheckout} className={`checkout-btn ${isDisabled ? 'disabled' : ''}`}
                        disabled={isDisabled}
                    >
                        {!isCheckoutPage ? 'CHECKOUT' : (
                            <>
                                {!isMobile ? (
                                    <>
                                        <div className="pay-container">
                                            <img src={lock} alt="" />
                                            <p>PAY</p>
                                        </div>
                                        <span>₪{calcPrice()}</span>
                                    </>
                                ) : (
                                    <div className="payment">
                                        <img src={lock} alt="" />
                                        <p>Complete payment</p>
                                    </div>
                                )}
                            </>
                        )}
                    </button>
                    {!isCheckoutPage && <Link onClick={toggleBag} className="order-btn" to='/order-history'>ORDER HISTORY</Link>}
                </div>
            </section>
            {isSignInModalOpen && <SignInModal isOpen={isSignInModalOpen} toggleModal={toggleSignInModal} isHeader={isHeader} />}
        </>
    )
}