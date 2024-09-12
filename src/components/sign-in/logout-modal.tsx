import { useMediaQuery } from 'react-responsive'
import LogoutIcon from '@mui/icons-material/Logout'

import HeaderModal from "../modals/header-modal"
import { logout } from '../../store/user/user.actions'

interface LogoutModalProps {
    isOpen: boolean
    toggleModal: () => void
    buttonPosition: { left: number }
}

export function LogoutModal({ isOpen, toggleModal, buttonPosition }: LogoutModalProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    function onLogout() {
        logout()
        toggleModal()
    }

    return (
        <HeaderModal
            className="logout-modal"
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="logout-modal"
            aria-describedby="logout-modal-description"
            boxClassName="logout-modal-box"
            boxSx={{
                top: !isMobile ? '64px' : '46px',
                left: `${buttonPosition.left}px`,
                transform: 'translateX(-50%)'
            }}
        >
            <button className="logout-btn" onClick={onLogout}>
                <LogoutIcon />
                <h6>Logout</h6>
            </button>
        </HeaderModal>
    )
}