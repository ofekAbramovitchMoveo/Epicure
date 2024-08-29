/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

import RestaurantPreview from "./restaurant-preview"

export default function RestaurantList({ restaurants, isChefRestaurants, chefId }) {
    const chefs = useSelector(storeState => storeState.chefModule.chefs)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()

    function getChefName(chefId) {
        const chef = chefs.find(chef => chef.id === chefId)
        return chef?.name
    }

    if (!restaurants || !restaurants.length) return <h1 className="no-restaurants">No restaurants found</h1>
    return (
        <section className={`restaurant-list-container ${isChefRestaurants ? 'chef' : ''}`}>
            {!isChefRestaurants && !location.pathname.includes('/restaurants') && (
                <h2 className="restaurant-list-title">popular restaurants in epicure:</h2>
            )}
            {isChefRestaurants && <h2 className="restaurant-list-title-chef">{getChefName(chefId).split(' ')[0]}{`'`}s Restaurants</h2>}
            <ul className={`restaurant-list ${isChefRestaurants ? 'chef' : ''}`}>
                {isMobile && !location.pathname.includes('/restaurants') ? (
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
            {!isChefRestaurants && !location.pathname.includes('/restaurants') && (
                <Link className="all-link" to="/restaurants">{`All Restaurants >>`}</Link>
            )}
        </section>
    )
}