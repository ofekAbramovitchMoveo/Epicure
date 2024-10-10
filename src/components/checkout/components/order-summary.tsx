import { useSelector } from "react-redux"

import { RootState } from "../../../store/store"
import { DeliveryDetails, PaymentDetails } from "../../../types/order-details.type"
import CheckoutShoppingBag from "../../shopping-bag/checkout-shopping-bag"

interface OrderSummaryProps {
    isDisabled: boolean
    deliveryDetails: DeliveryDetails
    paymentDetails: PaymentDetails
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

export default function OrderSummary({ isDisabled, deliveryDetails, paymentDetails, setErrors }: OrderSummaryProps) {
    const bag = useSelector((storeState: RootState) => storeState.restaurantModule.bag)

    return (
        <section className="order-summary">
            <CheckoutShoppingBag bag={bag} isDisabled={isDisabled}
                deliveryDetails={deliveryDetails}
                paymentDetails={paymentDetails}
                setErrors={setErrors}
            />
        </section>
    )
}