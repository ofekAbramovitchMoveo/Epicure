/* eslint-disable react/prop-types */
import { useLocation } from "react-router"
import RestaurantList from "../cmps/restaurant-list"
import RestaurantPageLinks from "../cmps/restaurant-page-links"
import RestaurantPageFilters from "../cmps/restaurant-page-filters"

export default function RestaurantPage({ restaurants }) {
    const location = useLocation()

    function getFilteredRestaurants() {
        if (!restaurants || !restaurants.length) return []
        let filteredRestaurants = [...restaurants]
        switch (location.pathname) {
            case '/restaurant/new':
                return filteredRestaurants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
            case '/restaurant/most-popular':
                return filteredRestaurants.sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
            case '/restaurant/open-now':
                return filteredRestaurants.filter(restaurant => restaurant.isOpenNow)
            default:
                return filteredRestaurants
        }
    }

    return (
        <section className="restaurant-page main-layout full">
            <RestaurantPageLinks />
            <RestaurantPageFilters />
            <RestaurantList restaurants={getFilteredRestaurants()} />
        </section>
    )
}