/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import RestaurantPreview from "./restaurant-preview"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function RestaurantList({ restaurants, isChefRestaurants, chefId }) {
    const chefs = useSelector(storeState => storeState.chefModule.chefs)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    function getChefName(chefId) {
        const chef = chefs.find(chef => chef.id === chefId)
        return chef.name
    }

    return (
        <section className={`restaurant-list-container ${isChefRestaurants ? 'chef' : ''}`}>
            {!isChefRestaurants && <h2 className="restaurant-list-title">popular restaurants in epicure:</h2>}
            {isChefRestaurants && <h2 className="restaurant-list-title-chef">{getChefName(chefId).split(' ')[0]}{`'`}s Restaurants</h2>}
            <ul className={`restaurant-list ${isChefRestaurants ? 'chef' : ''}`}>
                {isMobile ? (
                    <Carousel showArrows showThumbs={false} showStatus={false} showIndicators={false}>
                        {restaurants.map(restaurant => (
                            <div key={restaurant.id}>
                                <RestaurantPreview restaurant={restaurant} chefName={getChefName(restaurant.chefId)} isChefRestaurants={isChefRestaurants} />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    restaurants.map(restaurant => (
                        <li key={restaurant.id}>
                            <RestaurantPreview restaurant={restaurant} chefName={getChefName(restaurant.chefId)} isChefRestaurants={isChefRestaurants} />
                        </li>
                    ))
                )
                }
            </ul>
            {!isChefRestaurants && <Link className="all-link" to="/restaurant">{`All Restaurants >>`}</Link>}
        </section>
    )
}