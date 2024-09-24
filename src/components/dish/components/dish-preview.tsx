import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Tooltip } from "@mui/material"

import DishOrder from "../pages/dish-order"
import { Dish } from "../../../types/dish.type"
import { Restaurant } from "../../../types/restaurant.type"
import Image from "../../image"
import DishInfo from "./dish-info"

interface DishPreviewProps {
    dish: Dish
    isOpenNow?: boolean
    restaurant?: Restaurant | null
    toggleIsAnyDishOrderOpen?: () => void
}

export default function DishPreview({ dish, isOpenNow = true, restaurant, toggleIsAnyDishOrderOpen }: DishPreviewProps) {
    const [isDishOrderOpen, setIsDishOrderOpen] = useState(false)
    const location = useLocation()
    const isRestaurantPage = location.pathname.includes('/restaurant')

    const toggleDishOrder = () => {
        setIsDishOrderOpen(!isDishOrderOpen)
        toggleIsAnyDishOrderOpen && toggleIsAnyDishOrderOpen()
    }

    return (
        <>
            <Tooltip title={`${!isOpenNow && isRestaurantPage ? 'Can\'t order dishes, restaurant is closed' : ''}`}>
                <section className={`dish-preview ${!isOpenNow ? 'disabled' : ''}`} onClick={toggleDishOrder}
                    style={{ cursor: !isRestaurantPage ? 'auto' : (!isOpenNow ? 'not-allowed' : 'pointer') }}>
                    <Image src={dish.imgUrl || ''} alt="" className="dish-img" />
                    <DishInfo dish={dish} isRestaurantPage={isRestaurantPage} />
                </section>
            </Tooltip>
            {isDishOrderOpen && <DishOrder dish={dish} toggleDishOrder={toggleDishOrder}
                isDishOrderOpen={isDishOrderOpen} isOpenNow={isOpenNow} restaurant={restaurant || null} />}
        </>
    )
}