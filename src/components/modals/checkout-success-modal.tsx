import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Box, Fade, Modal } from "@mui/material"

import { RootState } from "../../store/store"
import { toggleCheckoutSuccess } from "../../store/order/order.actions"
import Image from "../image"

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
                    <Image src="close-white.svg" alt="close" className="close-icon" onClick={toggleCheckoutSuccess} />
                    <Image src="check.svg" alt="check" />
                    <div className="title-container">
                        <h1>ORDER RECEIVED</h1>
                        <p>Your food is in process</p>
                    </div>
                    <div className="time-estimation">
                        <p>Arrives in <span>90:00</span> min</p>
                    </div>
                    <div className="dishes">
                        {order?.bag.map(dish => (
                            <div className="dish" key={dish.bagDishId}>
                                <p className="dish-info">{dish.quantity}x <span>{dish.name}</span></p>
                                <p className="dish-price">₪{dish.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className="total-price">
                        <p>TOTAL - <span>₪{order?.totalPrice}</span></p>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}