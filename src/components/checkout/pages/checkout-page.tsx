import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

import CheckoutDetails from "../components/checkout-details"
import OrderSummary from "../components/order-summary"
import { RootState } from "../../../store/store"
import { DeliveryDetails, PaymentDetails } from "../../../types/order-details.type"

export default function CheckoutPage() {
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
        fullName: user?.fullName,
        address: user?.address,
        phone: user?.phone
    })
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
        cardNumber: '',
        nameOnCard: '',
        cvv: '',
        expiryDate: null
    })
    const [errors, setErrors] = useState<string[]>([])
    const navigate = useNavigate()
    const isDisabled = !deliveryDetails.fullName || !deliveryDetails.address || !deliveryDetails.phone ||
        !paymentDetails.cardNumber || !paymentDetails.nameOnCard || !paymentDetails.cvv
        || !paymentDetails.expiryDate || !!errors?.length

    useEffect(() => {
        if (!user) navigate(-1)
    }, [user])

    return (
        <section className="checkout-page">
            <CheckoutDetails
                deliveryDetails={deliveryDetails}
                setDeliveryDetails={setDeliveryDetails}
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                errors={errors}
                setErrors={setErrors}
            />
            <OrderSummary isDisabled={isDisabled} deliveryDetails={deliveryDetails}
                paymentDetails={paymentDetails}
                setErrors={setErrors}
            />
        </section>
    )
}