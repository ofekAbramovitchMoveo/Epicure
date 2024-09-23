import { useSelector } from "react-redux"

import ShoppingBag from "../../dish/components/shopping-bag"
import { RootState } from "../../../store/store"
import { DeliveryDetails, PaymentDetails } from "../../../types/order-details.type"

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
            <ShoppingBag bag={bag} isDisabled={isDisabled}
                deliveryDetails={deliveryDetails}
                paymentDetails={paymentDetails}
                setErrors={setErrors}
            />
        </section>
    )
}