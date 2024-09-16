import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Tooltip } from "@mui/material"

import DishOrder from "../../pages/dish-order"
import { Dish } from "../../types/dish.type"
import { Restaurant } from "../../types/restaurant.type"

interface DishPreviewProps {
    dish: Dish
    isOpenNow?: boolean
    restaurant?: Restaurant | null
}

export default function DishPreview({ dish, isOpenNow = true, restaurant }: DishPreviewProps) {
    const [isDishOrderOpen, setIsDishOrderOpen] = useState(false)
    const location = useLocation()
    const isRestaurantPage = location.pathname.includes('/restaurant')

    const toggleDishOrder = () => setIsDishOrderOpen(!isDishOrderOpen)

    return (
        <>
            <Tooltip title={`${!isOpenNow && isRestaurantPage ? 'Can\'t order dishes, restaurant is closed' : ''}`}>
                <section className={`dish-preview ${!isOpenNow ? 'disabled' : ''}`} onClick={toggleDishOrder}
                    style={{ cursor: !isRestaurantPage ? 'auto' : (!isOpenNow ? 'not-allowed' : 'pointer') }}>
                    <img src={dish.imgUrl} alt="" className="dish-img" />
                    <div className="dish-info">
                        <h3>{dish.name}</h3>
                        {!isRestaurantPage && (
                            <img src={dish.iconUrl} alt="" className="dish-icon" />
                        )}
                        <p>{dish.ingredients?.join(', ')}</p>
                        <div className="price-container">
                            <hr className="line" />
                            <span className="price">₪{dish.price}</span>
                            <hr className="line" />
                        </div>
                    </div>
                </section>
            </Tooltip>
            {isDishOrderOpen && isOpenNow && isRestaurantPage && <DishOrder dish={dish} toggleDishOrder={toggleDishOrder}
                isDishOrderOpen={isDishOrderOpen} isOpenNow={isOpenNow} restaurant={restaurant || null} />}
        </>
    )
}