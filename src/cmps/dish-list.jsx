/* eslint-disable react/prop-types */
import DishPreview from "./dish-preview"

export default function DishList({ dishes }) {

    if (!dishes || !dishes.length) return <h1 className="no-dishes">No dishes found</h1>
    return (
        <ul className="dish-list">
            {dishes.map(dish => (
                <li key={dish.id}>
                    <DishPreview dish={dish} />
                </li>
            ))}
        </ul>
    )
}