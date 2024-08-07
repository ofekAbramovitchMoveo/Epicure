/* eslint-disable react/prop-types */
import DishPreview from "./dish-preview"


export default function DishList({ restaurants }) {



    return (
        <section className="dish-list-container">
            <h2 className="dish-list-title">SIGNATURE DISH OF:</h2>
            <ul className="dish-list">
                {restaurants.map(restaurant => (
                    restaurant.dishes.filter(dish => dish.isSignature).map(dish => (
                        <li key={dish.id}>
                            <DishPreview dish={dish} />
                        </li>
                    ))
                ))}
            </ul>
        </section>
    )
}