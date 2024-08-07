/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"

export default function RestaurantPreview({ restaurant, chefName, isChefRestaurants }) {

    return (
        <Link className={`restaurant-preview ${isChefRestaurants ? 'chef' : ''}`} to={`/restaurant/${restaurant.id}`}>
            <img src={restaurant.imgUrl} alt="" className={`restaurant-img ${isChefRestaurants ? 'chef' : ''}`} />
            <div className={`restaurant-info ${isChefRestaurants ? 'chef' : ''}`}>
                <h2>{restaurant.name}</h2>
                {!isChefRestaurants &&
                    <>
                        <p>{chefName}</p>
                        <div className="rating">
                            {utilService.renderStars(restaurant.rating)}
                        </div>
                    </>
                }
            </div>
        </Link>
    )
}
