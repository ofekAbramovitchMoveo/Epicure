import { useMediaQuery } from "react-responsive"
import { TextField } from "@mui/material"
import { Dayjs } from 'dayjs'

import SignUpForm from "./sign-in/sign-up-form"
import PaymentForm from "./payment-form"
import { DeliveryDetails, PaymentDetails } from "../types/order-details.type"

interface CheckoutDetailsProps {
    deliveryDetails: DeliveryDetails
    setDeliveryDetails: React.Dispatch<React.SetStateAction<DeliveryDetails>>
    paymentDetails: PaymentDetails
    setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>
    errors: string[]
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CheckoutDetails({ deliveryDetails, setDeliveryDetails, paymentDetails, setPaymentDetails, errors, setErrors }: CheckoutDetailsProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })

    function handleDeliveryChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const { name: field, value } = target
        setDeliveryDetails(prevState => ({ ...prevState, [field]: value }))
    }

    function handlePaymentChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const { name: field } = target
        let { value } = target

        if (field === 'cardNumber') value = value.replace(/\D/g, '')
            .replace(/(\d{4})(?=\d)/g, '$1 ')
        else if (field === 'cvv') value = value.replace(/\D/g, '')

        setPaymentDetails(prevState => ({ ...prevState, [field]: value }))
        setErrors([])
    }

    function handleExpiryDateChange(date: Dayjs | null) {
        setPaymentDetails(prevState => ({ ...prevState, expiryDate: date }))
    }

    function getError(field: keyof DeliveryDetails | keyof PaymentDetails) {
        const fieldRegex = new RegExp(`${field}`, 'i')
        const errMsg = errors.find(error => {
            const errWithoutPrefix = error.substring(error.indexOf('.') + 1)
            return fieldRegex.test(errWithoutPrefix.replace(/\s/g, ''))
        })
        if (errMsg) {
            return errMsg.substring(errMsg.indexOf('.') + 1).trim()
        }
        return null
    }

    function renderTextField(label: string, name: keyof DeliveryDetails | keyof PaymentDetails,
        type: string = 'text', maxLength?: number) {
        const isPaymentField = name in paymentDetails
        const isNumericField = name === 'cardNumber' || name === 'cvv' || name === 'expiryDate'
        const value = isPaymentField ? paymentDetails[name as keyof PaymentDetails] : deliveryDetails[name as keyof DeliveryDetails]
        const error = getError(name)

        return (
            <TextField variant="standard" type={type}
                label={label}
                name={name}
                value={value}
                onChange={isPaymentField ? handlePaymentChange : handleDeliveryChange}
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

    return (
        <form className={`checkout-details ${isMobile ? 'main-layout' : ''}`}>
            <div className="delivery-details-container">
                <h3>delivery details</h3>
                <SignUpForm renderTextField={renderTextField} />
            </div>
            <div className="payment-details-container">
                <h3>payment details</h3>
                <PaymentForm renderTextField={renderTextField} handleExpiryDateChange={handleExpiryDateChange}
                    setErrors={setErrors}
                />
            </div>
        </form>
    )
} 