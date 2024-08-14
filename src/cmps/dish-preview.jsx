/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


export default function DishPreview({ dish }) {


    return (
        <Link className="dish-preview" to={`/dish/${dish.id}`}>
            <img src={dish.imgUrl} alt="" className="dish-img" />
            <div className="dish-info">
                <h3>{dish.name}</h3>
                <img src={dish.iconUrl} alt="" className="dish-icon" />
                <p>{dish.ingredients?.join(', ')}</p>
                <div className="price-container">
                    <hr className="line" />
                    <span className="price">₪ {dish.price}</span>
                    <hr className="line" />
                </div>
            </div>
        </Link>
    )
}