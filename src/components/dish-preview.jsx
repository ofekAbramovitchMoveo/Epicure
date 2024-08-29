/* eslint-disable react/prop-types */
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Tooltip } from "@mui/material"

import DishOrder from "../pages/dish-order"

export default function DishPreview({ dish, isOpenNow, restaurant }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const location = useLocation()
    const isRestaurantPage = location.pathname.includes('/restaurants')

    const toggleModal = () => setIsModalOpen(!isModalOpen)

    return (
        <>
            <Tooltip title={`${!isOpenNow && isRestaurantPage ? 'Can\'t order dishes, restaurant is closed' : ''}`}>
                <section className={`dish-preview ${!isOpenNow ? 'disabled' : ''}`} onClick={toggleModal}
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
            <DishOrder dish={dish} toggleModal={toggleModal} isModalOpen={isModalOpen}
                isOpenNow={isOpenNow} restaurant={restaurant} />
        </>
    )
}