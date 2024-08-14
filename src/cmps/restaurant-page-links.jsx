import { NavLink } from "react-router-dom"

export default function RestaurantPageLinks() {

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