import { Box, Modal } from "@mui/material"

import ShoppingBag from "../shopping-bag"
import { BagDish } from "../../types/dish.type"

import close_white from '/imgs/close-white.svg'

interface OrderAgainModalProps {
    toggleOrderAgainModal: () => void
    isOrderAgainModalOpen: boolean
    bag: BagDish[]
}

export default function OrderAgainModal({ toggleOrderAgainModal, isOrderAgainModalOpen, bag }: OrderAgainModalProps) {

    return (
        <Modal
            className="order-again-modal"
            open={isOrderAgainModalOpen}
            onClose={toggleOrderAgainModal}
            aria-labelledby="order-again-modal"
            aria-describedby="order-again-description"
            slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } } }}
        >
            <Box className="order-again-modal-box">
                <img src={close_white} alt="close" onClick={toggleOrderAgainModal} className="close-icon" />
                <ShoppingBag bag={bag} />
            </Box>
        </Modal>
    )
}