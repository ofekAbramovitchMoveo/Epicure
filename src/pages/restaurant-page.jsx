/* eslint-disable react/prop-types */
import RestaurantList from "../cmps/restaurant-list"
import RestaurantPageLinks from "../cmps/restaurant-page-links"
import RestaurantPageFilters from "../cmps/restaurant-page-filters"
import { useMediaQuery } from "react-responsive"
import { useLocation } from "react-router"
import Map from "../cmps/map"

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