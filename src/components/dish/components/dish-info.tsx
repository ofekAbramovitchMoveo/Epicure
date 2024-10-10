import { Dish } from "../../../types/dish.type"
import Image from "../../image"
import TitledP from "../../titled-p"
import DishPrice from "./dish-price"

interface DishInfoProps {
    dish: Dish
    isRestaurantPage: boolean
}

export default function DishInfo({ dish, isRestaurantPage }: DishInfoProps) {
    const ingredientsStr = dish.ingredients?.join(', ') || ''

    return (
        <div className="dish-info">
            <h3>{dish.name}</h3>
            {!isRestaurantPage && (
                <Image src={dish.iconUrl || ''} alt="" className="dish-icon" />
            )}
            <TitledP title={ingredientsStr}>{ingredientsStr}</TitledP>
            <DishPrice price={dish.price} />
        </div>
    )
}