import { TextField } from "@mui/material"

import { User } from "../../types/user.type"

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

    function getError(field: keyof User) {
        return errors.find(error => error.toLowerCase().includes(field.toLowerCase()))
    }

    function renderTextField(label: string, name: keyof User, type: string = 'text') {
        const error = getError(name)
        return (
            <TextField variant="standard" type={type}
                label={label}
                name={name}
                value={credentials[name]}
                onChange={handleChange}
                required
                error={!!error}
                helperText={error}
            />
        )
    }

    return (
        <form className="inputs-container" onSubmit={ev => onSubmit(ev, isSignUp)}>
            {isSignUp && (
                <>
                    {renderTextField('Full name', 'fullName')}
                    {renderTextField('Address', 'address')}
                    {renderTextField('Phone', 'phone', 'tel')}
                </>
            )}
            {renderTextField('Email address', 'email', 'email')}
            {renderTextField('Password', 'password', 'password')}
        </form>
    )
}