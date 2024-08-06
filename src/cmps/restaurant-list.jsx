/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import RestaurantPreview from "./restaurant-preview"

export default function RestaurantList({ restaurants }) {

    return (
        <section className="restaurant-list-container">
            <h2 className="restaurant-list-title">popular restaurant in epicure:</h2>
            <ul className="restaurant-list">
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>
                        <RestaurantPreview restaurant={restaurant} />
                    </li>
                ))}
            </ul>
            <Link className="all-link" to="/restaurant">{`All Restaurants >>`}</Link>
        </section>
    )
}