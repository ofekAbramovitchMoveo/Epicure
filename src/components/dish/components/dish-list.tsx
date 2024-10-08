import { Dish } from "../../../types/dish.type"
import { Restaurant } from "../../../types/restaurant.type"
import DishPreview from "./dish-preview"

interface DishListProps {
    dishes: Dish[]
    isOpenNow: boolean
    restaurant: Restaurant | null
    toggleIsAnyDishOrderOpen: () => void
}

export default function DishList({ dishes, isOpenNow, restaurant, toggleIsAnyDishOrderOpen }: DishListProps) {

    if (!dishes?.length) return <h1 className="no-dishes">No dishes found</h1>
    return (
        <ul className="dish-list">
            {dishes.map(dish => (
                <li key={dish._id}>
                    <DishPreview dish={dish} isOpenNow={isOpenNow} restaurant={restaurant}
                        toggleIsAnyDishOrderOpen={toggleIsAnyDishOrderOpen} />
                </li>
            ))}
        </ul>
    )
}