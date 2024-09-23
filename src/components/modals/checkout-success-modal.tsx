import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Box, Fade, Modal } from "@mui/material"

import { RootState } from "../../store/store"
import { toggleCheckoutSuccess } from "../../store/order/order.actions"
import CheckoutSuccessBox from "./checkout-success-box"

export default function CheckoutSuccessModal() {
    const order = useSelector((storeState: RootState) => storeState.orderModule.order)
    const isCheckoutSuccessOpen = useSelector((storeState: RootState) => storeState.orderModule.isCheckoutSuccessOpen)

    useEffect(() => {
        if (isCheckoutSuccessOpen) {
            const timeout = setTimeout(() => {
                toggleCheckoutSuccess()
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [isCheckoutSuccessOpen])

    return (
        <Modal className="checkout-success-modal"
            open={isCheckoutSuccessOpen}
            onClose={toggleCheckoutSuccess}
            aria-labelledby="checkout-success-modal-title"
            aria-describedby="checkout-success-modal-description"
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }
                }
            }}
        >
            <Fade in={isCheckoutSuccessOpen} timeout={300} easing={{ enter: 'ease-in', exit: 'ease-out' }}>
                <Box className="checkout-success-box">
                    <CheckoutSuccessBox toggleCheckoutSuccess={toggleCheckoutSuccess} order={order} />
                </Box>
            </Fade>
        </Modal>
    )
}