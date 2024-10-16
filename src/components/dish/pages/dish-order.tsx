import { useState } from "react"
import { useLocation } from "react-router"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"

import WarningDialog from "../../modals/warning-dialog"
import { Dish } from "../../../types/dish.type"
import { Restaurant } from "../../../types/restaurant.type"
import { RootState } from "../../../store/store"
import DishOrderBox from "../components/dish-order-box"

interface DishOrderProps {
    dish: Dish
    toggleDishOrder: () => void
    isDishOrderOpen: boolean
    isOpenNow: boolean
    restaurant?: Restaurant | null
}

export default function DishOrder({ dish, toggleDishOrder, isDishOrderOpen, isOpenNow, restaurant }: DishOrderProps) {
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
    const isRestaurantPage = location.pathname.includes('/restaurant')

    const modalSx = {
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
                sx={modalSx}
            >
                <Box className={`dish-order-box ${isMobile ? 'main-layout' : ''}`} sx={{
                    position: 'relative', ...(isMobile && { height: '100vh', width: '100vw' })
                }}>

                    <DishOrderBox isMobile={isMobile} dish={dish} toggleDishOrder={toggleDishOrder}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        restaurant={restaurant}
                    />
                </Box>
            </Modal>
            {isWarningPopupOpen && <WarningDialog toggleDishOrder={toggleDishOrder} />}
        </>
    )
}