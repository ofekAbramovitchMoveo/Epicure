/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"

export default function RestaurantPreview({ restaurant }) {

    return (
        <Link className="restaurant-preview" to={`/restaurant/${restaurant.id}`}>
            <img src={restaurant.imgUrl} alt="" className="restaurant-img" />
            <div className="restaurant-info">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.chef}</p>
                <div className="rating">
                    {utilService.renderStars(restaurant.rating)}
                </div>
            </div>
        </Link>
    )
}
