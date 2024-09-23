import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { toggleBag } from "../../../store/restaurant/restaurant.actions"
import { RootState } from "../../../store/store"
import { toggleSignInModal } from "../../../store/user/user.actions"
import { BagDish } from "../../../types/dish.type"
import { DeliveryDetails, PaymentDetails } from "../../../types/order-details.type"
import SignInModal from "../../sign-in/sign-in-modal"
import Image from "../../image"
import BagDishList from "./bag-dish-list"
import ShoppingBagBtns from "./shopping-bag-btns"

interface ShoppingBagProps {
    bag: BagDish[]
    isDisabled?: boolean
    deliveryDetails?: DeliveryDetails
    paymentDetails?: PaymentDetails
    setErrors?: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ShoppingBag({ bag, isDisabled, deliveryDetails, paymentDetails, setErrors }: ShoppingBagProps) {
    const isSignInModalOpen = useSelector((storeState: RootState) => storeState.userModule.isSignInModalOpen)
    const isHeader = useSelector((storeState: RootState) => storeState.userModule.isHeader)
    const isCheckoutSuccessOpen = useSelector((storeState: RootState) => storeState.orderModule.isCheckoutSuccessOpen)
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isCheckoutPage = location.pathname.includes('/checkout')
    const isOrderHistoryPage = location.pathname.includes('/order-history')
    const isOrderAgain = isOrderHistoryPage && !isBagOpen

    useEffect(() => {
        if (!bag?.length && isCheckoutPage && !isCheckoutSuccessOpen) {
            navigate(-1)
        }
    }, [bag?.length, isCheckoutPage])

    function calcPrice() {
        return bag.reduce((acc, dish) => (
            acc + ((dish.price || 0) * (dish.quantity || 1))
        ), 0)
    }

    function onOrderHistory() {
        if (isOrderHistoryPage) return
        toggleBag()
    }

    if (!bag?.length) return (
        <>
            <div className="empty-bag">
                <Image src="bag-modal.svg" alt="" />
                <h4>YOUR BAG IS <br /> EMPTY</h4>
            </div>
            <Link onClick={onOrderHistory} className="order-btn" to='/order-history'>ORDER HISTORY</Link>
        </>
    )
    return (
        <>
            <section className={`shopping-bag ${isMobile && isCheckoutPage ? 'main-layout' : ''}`}>
                <h1>{isOrderAgain ? 'order summary' : `${isMobile ? 'MY' : 'YOUR'} ORDER`}</h1>
                {(!isCheckoutPage || (isCheckoutPage && !isMobile)) && (
                    <h3 className="restaurant-name">{bag[0].restaurantName}</h3>
                )}
                <BagDishList bag={bag} />
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
                <ShoppingBagBtns isDisabled={isDisabled} isCheckoutPage={isCheckoutPage} isBagOpen={isBagOpen}
                    isMobile={isMobile} onOrderHistory={onOrderHistory} calcPrice={calcPrice}
                    deliveryDetails={deliveryDetails} paymentDetails={paymentDetails}
                    isOrderAgain={isOrderAgain} bag={bag} setErrors={setErrors}
                />
            </section>
            {isSignInModalOpen && <SignInModal isOpen={isSignInModalOpen}
                toggleModal={toggleSignInModal}
                isHeader={isHeader}
                bag={bag}
            />}
        </>
    )
}