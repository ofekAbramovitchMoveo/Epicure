/* eslint-disable react/prop-types */
import { useLocation } from "react-router"
import { useMediaQuery } from "react-responsive"

import Map from "../components/map"
import RestaurantList from "../components/restaurant-list"
import RestaurantPageFilters from "../components/restaurant-page-filters"
import RestaurantPageLinks from "../components/restaurant-page-links"

export default function RestaurantPage({ restaurants, setFilterBy }) {
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
                <RestaurantList restaurants={restaurants} />
            ) : (
                <Map restaurants={restaurants} />
            )}
        </section>
    )
}