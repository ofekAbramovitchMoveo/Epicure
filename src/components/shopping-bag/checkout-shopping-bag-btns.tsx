import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

import { BagDish } from "../../types/dish.type"
import { DeliveryDetails, OrderDetails, PaymentDetails } from "../../types/order-details.type"
import Image from "../image"
import { RootState } from "../../store/store"
import { submitOrder, toggleCheckoutSuccess } from "../../store/order/order.actions"
import { clearBag } from "../../store/restaurant/restaurant.actions"

interface CheckoutShoppingBagBtnsProps {
    isDisabled: boolean
    isMobile: boolean
    calcPrice: () => number
    deliveryDetails: DeliveryDetails
    paymentDetails: PaymentDetails
    bag: BagDish[]
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CheckoutShoppingBagBtns({ isDisabled, isMobile, calcPrice,
    deliveryDetails, paymentDetails, bag, setErrors }: CheckoutShoppingBagBtnsProps) {
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const navigate = useNavigate()

    async function onCheckout() {
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
            const order = await submitOrder(orderDetails)
            if (order) {
                navigate('/')
                clearBag()
                toggleCheckoutSuccess()
            }
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

    }

    return (
        <div className="btns">
            <button onClick={onCheckout} className={`checkout-btn ${isDisabled ? 'disabled' : ''}`}
                disabled={isDisabled}
            >
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
            </button>
        </div>
    )
}