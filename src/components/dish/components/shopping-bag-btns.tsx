import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import dayjs from "dayjs"

import Image from "../../image"
import { RootState } from "../../../store/store"
import { SET_HEADER } from "../../../store/user/user.reducer"
import { toggleSignInModal } from "../../../store/user/user.actions"
import { clearBag, setBag, toggleBag } from "../../../store/restaurant/restaurant.actions"
import { DeliveryDetails, OrderDetails, PaymentDetails } from "../../../types/order-details.type"
import { BagDish } from "../../../types/dish.type"
import { submitOrder, toggleCheckoutSuccess } from "../../../store/order/order.actions"

interface ShoppingBagBtnsProps {
    isDisabled?: boolean
    isCheckoutPage?: boolean
    isBagOpen?: boolean
    isMobile?: boolean
    onOrderHistory?: () => void
    calcPrice?: () => number
    deliveryDetails?: DeliveryDetails
    paymentDetails?: PaymentDetails
    isOrderAgain?: boolean
    bag: BagDish[]
    setErrors?: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ShoppingBagBtns({ isDisabled, isCheckoutPage, isBagOpen,
    isMobile, onOrderHistory, calcPrice, deliveryDetails, paymentDetails, isOrderAgain, bag, setErrors }: ShoppingBagBtnsProps) {
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function onCheckout() {
        dispatch({ type: SET_HEADER, isHeader: false })

        if (!isCheckoutPage) {
            if (!user) toggleSignInModal()
            else {
                navigate('/checkout')
                if (isBagOpen) toggleBag()
                else if (isOrderAgain) setBag(bag)
            }
        } else {
            let order: OrderDetails | null = null
            try {
                const orderDetails: OrderDetails = {
                    deliveryDetails: deliveryDetails ?? {},
                    paymentDetails: paymentDetails ?? {
                        cardNumber: '',
                        nameOnCard: '',
                        cvv: '',
                        expiryDate: dayjs()
                    },
                    bag,
                    totalPrice: calcPrice?.() ?? 0,
                    userId: user?._id || ''
                }
                order = await submitOrder(orderDetails)
            } catch (err: any) {
                if (err?.response?.data?.message && setErrors) {
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
                navigate('/')
                clearBag()
                toggleCheckoutSuccess()
            }
        }
    }

    return (
        <div className="btns">
            <button onClick={onCheckout} className={`checkout-btn ${isDisabled ? 'disabled' : ''}`}
                disabled={isDisabled}
            >
                {!isCheckoutPage && isBagOpen ? 'CHECKOUT' : (
                    isOrderAgain ? 'ORDER AGAIN' : (
                        <>
                            {!isMobile ? (
                                <>
                                    <div className="pay-container">
                                        <Image src="lock.svg" alt="" />
                                        <p>PAY</p>
                                    </div>
                                    <span>₪{calcPrice?.() ?? 0}</span>
                                </>
                            ) : (
                                <div className="payment">
                                    <Image src="lock.svg" alt="" />
                                    <p>Complete payment</p>
                                </div>
                            )}
                        </>
                    )
                )}
            </button>
            {!isCheckoutPage && <Link onClick={onOrderHistory} className="order-btn" to='/order-history'>ORDER HISTORY</Link>}
        </div>
    )
}