import { Dish } from "../../../types/dish.type"
import Image from "../../image"
import DishPrice from "./dish-price"

interface DishInfoProps {
    dish: Dish
    isRestaurantPage: boolean
}

export default function DishInfo({ dish, isRestaurantPage }: DishInfoProps) {
    return (
        <div className="dish-info">
            <h3>{dish.name}</h3>
            {!isRestaurantPage && (
                <Image src={dish.iconUrl || ''} alt="" className="dish-icon" />
            )}
            <p>{dish.ingredients?.join(', ')}</p>
            <DishPrice price={dish.price} />
        </div>
    )
}