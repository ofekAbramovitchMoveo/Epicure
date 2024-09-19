import { Link } from "react-router-dom"

import { utilService } from "../../services/util.service"
import { Restaurant } from "../../types/restaurant.type"
import Image from "../image"

interface RestaurantPreviewProps {
    restaurant: Restaurant
    chefName: string | undefined
    isChefRestaurants: boolean
}

export default function RestaurantPreview({ restaurant, chefName, isChefRestaurants }: RestaurantPreviewProps) {

    return (
        <Link className={`restaurant-preview ${isChefRestaurants ? 'chef' : ''}`} to={`/restaurant/${restaurant._id}`}>
            <Image src={restaurant.imgUrl} alt="" className={`restaurant-img ${isChefRestaurants ? 'chef' : ''}`} />
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
