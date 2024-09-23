import { Box, Modal } from "@mui/material"

import ShoppingBag from "../dish/components/shopping-bag"
import { BagDish } from "../../types/dish.type"
import Image from "../image"

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
                <Image src="close-white.svg" alt="close" onClick={toggleOrderAgainModal} className="close-icon" />
                <ShoppingBag bag={bag} />
            </Box>
        </Modal>
    )
}