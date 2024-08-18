/* eslint-disable react/prop-types */
import { useState } from "react"
import { useLocation } from "react-router-dom"
import DishOrder from "../pages/dish-order"

export default function DishPreview({ dish }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const location = useLocation()

    const toggleModal = () => setIsModalOpen(!isModalOpen)

    return (
        <>
            <section className="dish-preview" onClick={toggleModal}>
                <img src={dish.imgUrl} alt="" className="dish-img" />
                <div className="dish-info">
                    <h3>{dish.name}</h3>
                    {!location.pathname.includes('/restaurant') && (
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
            <DishOrder dish={dish} toggleModal={toggleModal} isModalOpen={isModalOpen} />
        </>
    )
}