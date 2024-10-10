import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import RestaurantPreview from "./restaurant-preview"
import { Restaurant } from "../../../types/restaurant.type"
import { RootState } from "../../../store/store"
import RestaurantListTitle from "./restaurant-list-title"
import RestaurantListSwiper from "./restaurant-list-swiper"
import { loadChefs } from "../../../store/chef/chef.actions"

interface RestaurantListProps {
    restaurants: Restaurant[]
    isChefRestaurants?: boolean | null
    chefId?: string | null
    lastRestaurantRef?: React.MutableRefObject<HTMLLIElement | null>
}

export default function RestaurantList({ restaurants, isChefRestaurants, chefId, lastRestaurantRef }: RestaurantListProps) {
    const chefs = useSelector((storeState: RootState) => storeState.chefModule.chefs)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const isRestaurantPage = location.pathname.includes('/restaurants')

    function getChefName(chefId: string) {
        const chef = chefs.find(chef => chef._id === chefId)
        return chef?.name
    }

    if (!restaurants || !restaurants.length) return <h1 className="no-restaurants">No restaurants found</h1>
    return (
        <section className={`restaurant-list-container ${isChefRestaurants ? 'chef' : ''}`}>
            <RestaurantListTitle isChefRestaurants={isChefRestaurants || false} chefId={chefId || ''} getChefName={getChefName} />
            <ul className={`restaurant-list ${isChefRestaurants ? 'chef' : ''}`}>
                {isMobile && !isRestaurantPage ? (
                    <RestaurantListSwiper restaurants={restaurants} isChefRestaurants={isChefRestaurants || false} getChefName={getChefName} />
                ) : (
                    restaurants.map((restaurant, idx) => (
                        <li key={restaurant._id} ref={idx === restaurants.length - 1 ? lastRestaurantRef : null}>
                            <RestaurantPreview restaurant={restaurant} chefName={getChefName(restaurant.chefId) || ''} isChefRestaurants={isChefRestaurants || false} />
                        </li>
                    ))
                )
                }
            </ul>
            {!isChefRestaurants && !isRestaurantPage && (
                <Link className="all-link" to="/restaurants">{`All Restaurants >>`}</Link>
            )}
        </section>
    )
}