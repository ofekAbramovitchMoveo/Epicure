/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function RestaurantPageLinks({ setFilterBy }) {
    const location = useLocation()

    useEffect(() => {
        setFilterBy(prevState => ({ ...prevState, path: location.pathname }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <section className="restaurant-page-links">
            <NavLink to='/restaurant' end>All</NavLink>
            <NavLink to='/restaurant/new'>New</NavLink>
            <NavLink to='/restaurant/most-popular'>Most Popular</NavLink>
            <NavLink to='/restaurant/open-now'>Open Now</NavLink>
            <NavLink to='/restaurant/map'>Map View</NavLink>
        </section>
    )
}