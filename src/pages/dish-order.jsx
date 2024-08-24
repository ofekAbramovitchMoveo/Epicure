/* eslint-disable react/prop-types */
import { Box, Dialog, Modal, Tooltip } from "@mui/material"
import close_white from '/imgs/close-white.svg'
import close from '/imgs/close.svg'
import DishOptions from "../cmps/dish-options"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import AppFooter from "../cmps/app-footer"
import { useDispatch, useSelector } from "react-redux"
import { ADD_TO_BAG, CLEAR_BAG } from "../store/restaurant/restaurant.reducer"
import { useLocation } from "react-router"
import question from '/imgs/question.svg'
import { toggleBag } from "../store/restaurant/restaurant.actions"

export default function DishOrder({ dish, toggleModal, isModalOpen, isOpenNow, restaurant }) {
    const [selectedOptions, setSelectedOptions] = useState({
        sideDish: '',
        changes: [],
        quantity: 1,
    })
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })
    const dispatch = useDispatch()
    const location = useLocation()
    const bag = useSelector(storeState => storeState.restaurantModule.bag)
    const isDisabled = !selectedOptions.sideDish || !selectedOptions.quantity
    const isrRestaurantPage = location.pathname.includes('/restaurant')

    function onAddToBag() {
        if (bag.length > 0 && bag[0].restaurantName !== restaurant.name) {
            setIsPopupOpen(true)
        } else {
            const dishToAdd = { ...dish, ...selectedOptions, restaurantName: restaurant.name }
            dispatch({ type: ADD_TO_BAG, dish: dishToAdd })
            toggleModal()
            toggleBag()
        }
    }

    function onPopupClose() {
        setIsPopupOpen(false)
    }

    function onClearBag() {
        dispatch({ type: CLEAR_BAG })
        onPopupClose()
        toggleModal()
        toggleBag()
    }

    return (
        <>
            <Modal
                className="dish-order-modal"
                open={isModalOpen && isOpenNow && isrRestaurantPage}
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
                    zIndex: 10000,
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
                        <Tooltip title={`${isDisabled ? 'Can\'t add dish to bag, must choose a side dish' : ''}`}
                            placement="top" arrow PopperProps={{
                                sx: {
                                    zIndex: 10000
                                }
                            }}>
                            <span>
                                <button disabled={isDisabled}
                                    className={`add-btn ${isDisabled ? 'disbaled' : ''}`} onClick={onAddToBag}>
                                    ADD TO BAG
                                </button>
                            </span>
                        </Tooltip>
                    </div>
                    <div className="container full">
                        {isMobile && (
                            <AppFooter />
                        )}
                    </div>
                </Box>
            </Modal>
            <Dialog
                className="warning-dialog"
                open={isPopupOpen}
                onClose={onPopupClose}
                aria-labelledby="warning-dialog-title"
                aria-describedby="warning-dialog-description"
                sx={{
                    zIndex: 10000,
                }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }
                    }
                }}
            >
                <Box className="dialog-box">
                    <img src={question} alt="" className="question" />
                    <div className="txt-container">
                        <h1 className="title">DELETE ORDER?</h1>
                        <p className="desc">
                            You can order from only one restaurant per order.
                            Going out to another restaurant will erase all the items you put in the cart
                        </p>
                    </div>
                    <div className="btns">
                        <button className="delete-btn btn" onClick={onClearBag}>DELETE</button>
                        <button className="back-btn btn" onClick={onPopupClose}>BACK TO ORDER</button>
                    </div>
                </Box>
            </Dialog>
        </>
    )
}