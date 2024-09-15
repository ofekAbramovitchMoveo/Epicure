import { DeliveryDetails } from "../../types/order-details.type"

interface SignUpFormProps {
    renderTextField: (label: string, name: keyof DeliveryDetails, type?: string) => JSX.Element
}

export default function SignUpForm({ renderTextField }: SignUpFormProps) {
    return (
        <>
            {renderTextField('Full name', 'fullName')}
            {renderTextField('Address', 'address')}
            {renderTextField('Phone', 'phone', 'tel')}
        </>
    )
}