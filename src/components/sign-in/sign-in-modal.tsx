import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Box } from "@mui/material"
import Modal from "@mui/material/Modal"

import { RootState } from "../../store/store"
import { loadUsers } from "../../store/user/user.actions"
import { BagDish } from "../../types/dish.type"
import SignInModalBox from "./sign-in-modal-box"

interface SignInModalProps {
    isOpen: boolean
    toggleModal: () => void
    isHeader?: boolean
    bag?: BagDish[]
}

export default function SignInModal({ isOpen, toggleModal, isHeader, bag }: SignInModalProps) {
    const users = useSelector((storeState: RootState) => storeState.userModule.users)
    const user = useSelector((storeState: RootState) => storeState.userModule.user)
    const [isSignUp, setIsSignUp] = useState(false)

    useEffect(() => {
        if (!users?.length) loadUsers()
    }, [])

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
                <SignInModalBox isHeader={isHeader} bag={bag} toggleModal={toggleModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
            </Box>
        </Modal>
    )
}