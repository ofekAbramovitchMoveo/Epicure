import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import Image from "../image"
import SignInForm from "./sign-in-form"
import { login, signup } from "../../store/user/user.actions"
import { User } from "../../types/user.type"
import { RootState } from "../../store/store"
import { BagDish } from "../../types/dish.type"
import { setBag, toggleBag } from "../../store/restaurant/restaurant.actions"

interface SignInModalBoxProps {
    isHeader?: boolean
    bag?: BagDish[]
    toggleModal: () => void
    isSignUp: boolean
    setIsSignUp: (isSignUp: boolean) => void
}

export default function SignInModalBox({ isHeader, bag, toggleModal, isSignUp, setIsSignUp }: SignInModalBoxProps) {
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const [errors, setErrors] = useState<string[]>([])
    const [credentials, setCredentials] = useState<User>({
        email: '',
        password: '',
        fullName: '',
        address: '',
        phone: ''
    })
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })
    const location = useLocation()
    const isOrderHistoryPage = location.pathname.includes('/order-history')
    const isDisabled = !credentials.email || !credentials.password ||
        (isSignUp && (!credentials.fullName || !credentials.address || !credentials.phone))

    function toggleSignUp() {
        setIsSignUp(!isSignUp)
        setErrors([])
    }

    async function onSubmit(ev: React.FormEvent<HTMLFormElement>, isSignUp: boolean) {
        ev.preventDefault()
        if (!credentials.email || !credentials.password) return
        let user = null

        try {
            if (isSignUp) {
                user = await signup(credentials)
            } else {
                user = await login(credentials)
            }
        } catch (err: any) {
            if (err?.response?.data?.message) {
                const errorMessages = Array.isArray(err.response.data.message)
                    ? err.response.data.message
                    : [err.response.data.message]
                setErrors(errorMessages)
            } else {
                console.log('Cannot sign up/login', err)
            }
            return
        }

        if (user && !isHeader) {
            navigate('/checkout')
            toggleModal()
            if (isBagOpen) toggleBag()
            if (isOrderHistoryPage && !isBagOpen && bag) setBag(bag)
        }
        else toggleModal()
    }

    function onButtonClick(ev: React.MouseEvent<HTMLButtonElement>) {
        onSubmit(ev as unknown as React.FormEvent<HTMLFormElement>, isSignUp)
    }


    return (
        <>
            <Image src={isMobile ? "close.svg" : "close-white.svg"} alt="" onClick={toggleModal} className="close-icon" />
            <h1>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>
            {!isSignUp && !isHeader && <p>To continue the order, please sign in</p>}
            <SignInForm onSubmit={onSubmit} isSignUp={isSignUp}
                credentials={credentials}
                setCredentials={setCredentials}
                errors={errors}
            />
            <button className={`login-btn ${isDisabled ? 'disabled' : ''}`}
                disabled={isDisabled}
                onClick={onButtonClick}
            >
                {isSignUp ? 'SIGN UP' : 'LOGIN'}
            </button>
            <p className="forget-password">Forget password?</p>
            <div className="or-container">
                <hr className="line" />
                <p className="or-text">or</p>
                <hr className="line" />
            </div>
            <button className="signup-btn" onClick={toggleSignUp}>{isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
        </>
    )
}