import { useEffect, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateField } from '@mui/x-date-pickers/DateField'
import dayjs from "dayjs"

import { PaymentDetails } from "../../../types/order-details.type"

interface PaymentFormProps {
    renderTextField: (label: string, name: keyof PaymentDetails, type: string, maxLength?: number) => React.ReactNode
    handleExpiryDateChange: (date: dayjs.Dayjs | null) => void
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
}

export default function PaymentForm({ renderTextField, handleExpiryDateChange, setErrors }: PaymentFormProps) {
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
            {renderTextField('Card Number', 'cardNumber', 'text', 19)}
            {renderTextField('Name On Card', 'nameOnCard', 'text')}
            {renderTextField('CVV', 'cvv', 'text', 3)}
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