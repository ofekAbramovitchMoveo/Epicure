import { useEffect, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateField } from '@mui/x-date-pickers/DateField'
import dayjs from "dayjs"

import { DeliveryDetails, PaymentDetails } from "../../../types/order-details.type"
import FormTextField from "../../form-text-field"
import { User } from "../../../types/user.type"

interface PaymentFormProps {
    handleExpiryDateChange: (date: dayjs.Dayjs | null) => void
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
    paymentDetails: PaymentDetails
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    getError: (field: keyof PaymentDetails | keyof DeliveryDetails | keyof User) => string | null | undefined
}

export default function PaymentForm({ handleExpiryDateChange, setErrors, paymentDetails, onChange, getError }: PaymentFormProps) {
    const [helperText, setHelperText] = useState('')
    const [dateError, setDateError] = useState<string | null>(null)

    useEffect(() => {
        if (dateError === 'disablePast') {
            setErrors(prev => [...prev.filter(e => e !== 'Invalid date'), 'Expiry date can\'t be in the past'])
        } else if (dateError === 'invalidDate') {
            setErrors(prev => [...prev.filter(e => e !== 'Expiry date can\'t be in the past'), 'Invalid date'])
        } else {
            setErrors(prev => prev.filter(error => error !== 'Expiry date can\'t be in the past' && error !== 'Invalid date'))
        }
    }, [dateError, setErrors])

    return (
        <>
            <FormTextField label="Card Number" name="cardNumber" type="text" maxLength={19} onChange={onChange} getError={getError} paymentDetails={paymentDetails} />
            <FormTextField label="Name On Card" name="nameOnCard" type="text" onChange={onChange} getError={getError} paymentDetails={paymentDetails} />
            <FormTextField label="CVV" name="cvv" type="text" maxLength={3} onChange={onChange} getError={getError} paymentDetails={paymentDetails} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField label="Expiry Date"
                    onChange={(date) => {
                        handleExpiryDateChange(date)
                        if (date?.isValid() && date?.isAfter(dayjs())) setDateError(null)
                    }}
                    format="MM/YY"
                    disablePast
                    variant="standard"
                    required
                    helperText={helperText}
                    onError={err => {
                        setDateError(err)
                        setHelperText(err === 'disablePast' ? 'Expiry date can\'t be in the past' :
                            err === 'invalidDate' ? 'Invalid date' : '')
                    }}
                />
            </LocalizationProvider>
        </>
    )
}