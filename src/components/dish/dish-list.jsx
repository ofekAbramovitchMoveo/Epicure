/* eslint-disable react/prop-types */
import DishPreview from "./dish-preview"

export default function DishList({ dishes, isOpenNow, restaurant }) {

    if (!dishes?.length) return <h1 className="no-dishes">No dishes found</h1>
    return (
        <ul className="dish-list">
            {dishes.map(dish => (
                <li key={dish._id}>
                    <DishPreview dish={dish} isOpenNow={isOpenNow} restaurant={restaurant} />
                </li>
            ))}
        </ul>
    )
}