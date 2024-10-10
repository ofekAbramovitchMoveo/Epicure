import { User } from "../../types/user.type"
import SignUpForm from "./sign-up-form"
import FormTextField from "../form-text-field"
import { DeliveryDetails, PaymentDetails } from "../../types/order-details.type"

interface SignInFormProps {
    onSubmit: (ev: React.FormEvent<HTMLFormElement>, isSignUp: boolean) => void
    isSignUp: boolean
    credentials: User
    setCredentials: React.Dispatch<React.SetStateAction<User>>
    errors: string[]
}

export default function SignInForm({ onSubmit, isSignUp, credentials, setCredentials, errors }: SignInFormProps) {

    function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const { name: field, value } = target
        setCredentials(prevState => ({ ...prevState, [field]: value }))
    }

    function getError(field: keyof User | keyof PaymentDetails | keyof DeliveryDetails) {
        return errors.find(error => error.toLowerCase().includes(field.toLowerCase()))
    }

    return (
        <form className="inputs-container" onSubmit={ev => onSubmit(ev, isSignUp)}>
            {isSignUp && <SignUpForm onChange={handleChange} getError={getError} />}
            <FormTextField label="Email address" name="email" type="email" onChange={handleChange} getError={getError} />
            <FormTextField label="Password" name="password" type="password" onChange={handleChange} getError={getError} />
        </form>
    )
}