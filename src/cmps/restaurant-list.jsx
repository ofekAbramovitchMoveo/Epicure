/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import RestaurantPreview from "./restaurant-preview"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

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
                    <Swiper spaceBetween={24} slidesPerView={1.33}>
                        {restaurants.map(restaurant => (
                            <SwiperSlide key={restaurant.id}>
                                <RestaurantPreview restaurant={restaurant} chefName={getChefName(restaurant.chefId)} isChefRestaurants={isChefRestaurants} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
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