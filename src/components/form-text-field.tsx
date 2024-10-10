import { TextField } from "@mui/material"
import { DeliveryDetails, PaymentDetails } from "../types/order-details.type"
import { User } from "../types/user.type"

interface FormTextFieldProps {
    label: string
    name: keyof DeliveryDetails | keyof PaymentDetails | keyof User
    type?: string
    maxLength?: number
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    getError: (field: keyof DeliveryDetails | keyof PaymentDetails | keyof User) => string | null | undefined
    paymentDetails?: PaymentDetails
    deliveryDetails?: DeliveryDetails
}

export default function FormTextField({ label, name, onChange, getError, type = 'text', maxLength, paymentDetails, deliveryDetails }: FormTextFieldProps) {
    const error = getError(name)
    const isNumericField = name === 'cardNumber' || name === 'cvv' || name === 'expiryDate'
    const isPaymentField = paymentDetails && name in paymentDetails
    const value = isPaymentField ? paymentDetails[name as keyof PaymentDetails] : deliveryDetails?.[name as keyof DeliveryDetails]

    return (
        <TextField variant="standard" type={type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            required
            inputProps={{
                inputMode: isNumericField ? 'numeric' : 'text',
                pattern: isNumericField ? '[0-9]*' : undefined,
                maxLength
            }}
            error={!!error}
            helperText={error}
        />
    )
}