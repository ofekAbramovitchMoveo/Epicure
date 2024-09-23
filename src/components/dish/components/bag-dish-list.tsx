import { removeFromBag } from "../../../store/restaurant/restaurant.actions"
import { BagDish } from "../../../types/dish.type"
import BagDishPreview from "./bag-dish-preview"

interface BagDishListProps {
    bag: BagDish[]
}

export default function BagDishList({ bag }: BagDishListProps) {

    function onRemoveDish(dishId: string) {
        removeFromBag(dishId)
    }

    return (
        <ul className="bag-dish-list">
            {bag.map(dish => (
                <li key={dish.bagDishId}>
                    <BagDishPreview dish={dish} onRemoveDish={onRemoveDish} />
                </li>
            ))}
        </ul>
    )
}