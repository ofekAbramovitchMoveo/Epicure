import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { Box, Modal } from "@mui/material"
import { useMediaQuery } from "react-responsive"

import { User } from "../../types/user.type"
import { RootState } from "../../store/store"
import { loadUsers, login, signup } from "../../store/user/user.actions"
import SignInForm from "./sign-in-form"
import { setBag, toggleBag } from "../../store/restaurant/restaurant.actions"
import { BagDish } from "../../types/dish.type"

import close_white from '/imgs/close-white.svg'
import close from '/imgs/close.svg'

interface SignInModalProps {
    isOpen: boolean
    toggleModal: () => void
    isHeader?: boolean
    bag?: BagDish[]
}

export default function SignInModal({ isOpen, toggleModal, isHeader, bag }: SignInModalProps) {
    const users = useSelector((storeState: RootState) => storeState.userModule.users)
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const [credentials, setCredentials] = useState<User>({
        email: '',
        password: '',
        fullName: '',
        address: '',
        phone: ''
    })
    const [isSignUp, setIsSignUp] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })
    const navigate = useNavigate()
    const location = useLocation()
    const isOrderHistoryPage = location.pathname.includes('/order-history')
    const isDisabled = !credentials.email || !credentials.password ||
        (isSignUp && (!credentials.fullName || !credentials.address || !credentials.phone))

    useEffect(() => {
        if (!users?.length) loadUsers()
    }, [])

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

    function toggleSignUp() {
        setIsSignUp(!isSignUp)
        setErrors([])
    }

    function onButtonClick(ev: React.MouseEvent<HTMLButtonElement>) {
        onSubmit(ev as unknown as React.FormEvent<HTMLFormElement>, isSignUp)
    }

    return (
        <Modal
            className="sign-in-modal"
            open={isOpen && !user}
            onClose={toggleModal}
            aria-labelledby="sign-in-modal-title"
            aria-describedby="sign-in-modal-description"
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }
                }
            }}
        >
            <Box className={`sign-in-modal-box ${isSignUp ? 'sign-up' : ''}`}>
                <img src={isMobile ? close : close_white} alt="" onClick={toggleModal} className="close-icon" />
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
            </Box>
        </Modal>
    )
}