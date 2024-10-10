import { useMediaQuery } from "react-responsive"

import CheckoutShoppingBagTitle from "./checkout-shopping-bag-title"
import { BagDish } from "../../types/dish.type"
import BagDishList from "../dish/components/bag-dish-list"
import CheckoutShoppingBagPrice from "./checkout-shopping-bag-price"
import ShoppingBagComments from "./shopping-bag-comments"
import CheckoutShoppingBagBtns from "./checkout-shopping-bag-btns"
import { DeliveryDetails, PaymentDetails } from "../../types/order-details.type"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

interface CheckoutShoppingBagProps {
    bag: BagDish[]
    isDisabled: boolean
    deliveryDetails: DeliveryDetails
    paymentDetails: PaymentDetails
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CheckoutShoppingBag({ bag, isDisabled, deliveryDetails, paymentDetails, setErrors }: CheckoutShoppingBagProps) {
    const isCheckoutSuccessOpen = useSelector((storeState: RootState) => storeState.orderModule.isCheckoutSuccessOpen)
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        if (!bag?.length && !isCheckoutSuccessOpen) {
            navigate(-1)
        }
    }, [bag?.length])

    function calcPrice() {
        return bag.reduce((acc, dish) => (
            acc + ((dish.price || 0) * (dish.quantity || 1))
        ), 0)
    }

    return (
        <section className={`shopping-bag ${isMobile ? 'main-layout' : ''}`}>
            <CheckoutShoppingBagTitle isMobile={isMobile} restaurantName={bag[0]?.restaurantName} />
            <BagDishList bag={bag} />
            <CheckoutShoppingBagPrice isMobile={isMobile} calcPrice={calcPrice} />
            <ShoppingBagComments />
            <CheckoutShoppingBagBtns isDisabled={isDisabled} isMobile={isMobile} calcPrice={calcPrice}
                deliveryDetails={deliveryDetails} paymentDetails={paymentDetails} bag={bag}
                setErrors={setErrors}
            />
        </section>
    )
}