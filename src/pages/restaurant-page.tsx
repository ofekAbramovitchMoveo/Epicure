import { useLocation } from "react-router"
import { useMediaQuery } from "react-responsive"

import Map from "../components/map/map"
import RestaurantList from "../components/restaurant/restaurant-list"
import RestaurantPageFilters from "../components/restaurant/restaurant-page-filters"
import RestaurantPageLinks from "../components/restaurant/restaurant-page-links"
import { Restaurant } from "../types/restaurant.type"
import { FilterBy } from "../types/filter-by.type"

interface RestaurantPageProps {
    restaurants: Restaurant[]
    setFilterBy: (updater: (prevState: FilterBy) => FilterBy) => void
}

export default function RestaurantPage({ restaurants, setFilterBy }: RestaurantPageProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const isMapView = location.pathname.includes('map')

    return (
        <section className="restaurant-page main-layout full">
            {isMobile && (
                <h1 className="title">RESTAURANTS</h1>
            )}
            <RestaurantPageLinks setFilterBy={setFilterBy} />
            <RestaurantPageFilters setFilterBy={setFilterBy} />
            {!isMapView ? (
                <RestaurantList restaurants={restaurants} isChefRestaurants={false} chefId={null} />
            ) : (
                <Map restaurants={restaurants} />
            )}
        </section>
    )
}