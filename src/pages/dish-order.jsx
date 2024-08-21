/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material"
import close_white from '/imgs/close-white.svg'
import close from '/imgs/close.svg'
import DishOptions from "../cmps/dish-options"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import AppFooter from "../cmps/app-footer"

export default function DishOrder({ dish, toggleModal, isModalOpen }) {
    const [selectedOptions, setSelectedOptions] = useState({
        sideDish: '',
        changes: [],
        quantity: 1,
    })
    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })

    return (
        <Modal
            className="dish-order-modal"
            open={isModalOpen}
            onClose={toggleModal}
            aria-labelledby="dish-order-title"
            aria-describedby="dish-order-description"
            disableAutoFocus
            disableEnforceFocus
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }
                }
            }}
            sx={{
                ...(isMobile && {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                })
            }}
        >
            <Box className={`dish-order-box ${isMobile ? 'main-layout' : ''}`} sx={{
                position: 'relative', ...(isMobile && {
                    height: '100vh',
                    width: '100vw',
                })
            }}>
                <img src={isMobile ? close : close_white} alt="" onClick={toggleModal} className="close-icon" />
                <img src={dish.imgUrl} alt="" className="dish-img full" />
                <div className="order-info">
                    <h1>{dish.name}</h1>
                    <p>{dish.ingredients?.join(', ')}</p>
                    <img className="icon" src={dish.iconUrl} alt="" />
                    <div className="price-container">
                        <hr className="line" />
                        <span className="price">₪{dish.price}</span>
                        <hr className="line" />
                    </div>
                    <DishOptions dish={dish} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                    <button className="add-btn">ADD TO BAG</button>
                </div>
                <div className="container full">
                    {isMobile && (
                        <AppFooter />
                    )}
                </div>
            </Box>
        </Modal>
    )
}