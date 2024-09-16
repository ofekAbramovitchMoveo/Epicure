import { useState } from "react"
import { useLocation } from "react-router"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Box, Modal, Tooltip } from "@mui/material"

import AppFooter from "../components/app-footer"
import DishOptions from "../components/dish/dish-options"
import { addToBag, clearBag, setWarningPopup, toggleBag } from "../store/restaurant/restaurant.actions"
import WarningDialog from "../components/modals/warning-dialog"
import { BagDish, Dish } from "../types/dish.type"
import { Restaurant } from "../types/restaurant.type"
import { RootState } from "../store/store"

import close_white from '/imgs/close-white.svg'
import close from '/imgs/close.svg'

interface DishOrderProps {
    dish: Dish
    toggleDishOrder: () => void
    isDishOrderOpen: boolean
    isOpenNow: boolean
    restaurant?: Restaurant | null
}

export default function DishOrder({ dish, toggleDishOrder, isDishOrderOpen, isOpenNow, restaurant }: DishOrderProps) {
    const bag = useSelector((storeState: RootState) => storeState.restaurantModule.bag)
    const isWarningPopupOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isWarningPopupOpen)
    const [selectedOptions, setSelectedOptions] = useState<{
        sideDish: string
        changes: string[]
        quantity: number
    }>({
        sideDish: '',
        changes: [],
        quantity: 1,
    })
    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })
    const location = useLocation()
    const isDisabled = !selectedOptions.sideDish || !selectedOptions.quantity
    const isRestaurantPage = location.pathname.includes('/restaurant')

    function onAddToBag() {
        if (bag.length && bag[0].restaurant !== restaurant?._id) {
            setWarningPopup(true)
        } else {
            const dishToAdd: BagDish = { ...dish, ...selectedOptions, restaurantName: restaurant?.name }
            addToBag(dishToAdd)
            toggleDishOrder()
            clearDishOrder()
        }
    }

    function clearDishOrder() {
        setSelectedOptions({
            sideDish: '',
            changes: [],
            quantity: 1,
        })
    }

    function onClearBag() {
        clearBag()
        setWarningPopup(false)
        toggleDishOrder()
        toggleBag()
    }

    return (
        <>
            <Modal
                className="dish-order-modal"
                open={isDishOrderOpen && isOpenNow && isRestaurantPage}
                onClose={toggleDishOrder}
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
                    <img src={isMobile ? close : close_white} alt="" onClick={toggleDishOrder} className="close-icon" />
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
            {isWarningPopupOpen && <WarningDialog onClearBag={onClearBag} />}
        </>
    )
}