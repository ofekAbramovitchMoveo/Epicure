import { DeliveryDetails, PaymentDetails } from "../../types/order-details.type"
import { User } from "../../types/user.type"
import FormTextField from "../form-text-field"

interface SignUpFormProps {
    deliveryDetails?: DeliveryDetails
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    getError: (field: keyof DeliveryDetails | keyof PaymentDetails | keyof User) => string | null | undefined
}

export default function SignUpForm({ deliveryDetails, onChange, getError }: SignUpFormProps) {
    return (
        <>
            <FormTextField label="Full name" name="fullName" onChange={onChange} getError={getError} deliveryDetails={deliveryDetails} />
            <FormTextField label="Address" name="address" onChange={onChange} getError={getError} deliveryDetails={deliveryDetails} />
            <FormTextField label="Phone" name="phone" type="tel" onChange={onChange} getError={getError} deliveryDetails={deliveryDetails} />
        </>
    )
}