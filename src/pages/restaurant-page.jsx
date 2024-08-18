/* eslint-disable react/prop-types */
import RestaurantList from "../cmps/restaurant-list"
import RestaurantPageLinks from "../cmps/restaurant-page-links"
import RestaurantPageFilters from "../cmps/restaurant-page-filters"
import { useMediaQuery } from "react-responsive"

export default function RestaurantPage({ restaurants, setFilterBy }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <section className="restaurant-page main-layout full">
            {isMobile && (
                <h1 className="title">RESTAURANTS</h1>
            )}
            <RestaurantPageLinks setFilterBy={setFilterBy} />
            {!isMobile && (
                <RestaurantPageFilters setFilterBy={setFilterBy} />
            )}
            <RestaurantList restaurants={restaurants} />
        </section>
    )
}