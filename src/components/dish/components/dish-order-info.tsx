import Image from "../../image"
import DishOptions from "./dish-options"
import { Dish } from "../../../types/dish.type"
import { Restaurant } from "../../../types/restaurant.type"
import DishPrice from "./dish-price"
import AddToBagBtn from "./add-to-bag-btn"

interface DishOrderInfoProps {
    dish: Dish
    toggleDishOrder: () => void
    selectedOptions: {
        sideDish: string;
        changes: string[];
        quantity: number;
    }
    setSelectedOptions: React.Dispatch<React.SetStateAction<{
        sideDish: string
        changes: string[]
        quantity: number
    }>>
    restaurant?: Restaurant | null
}

export default function DishOrderInfo({ dish, toggleDishOrder, selectedOptions,
    setSelectedOptions, restaurant }: DishOrderInfoProps) {

    return (
        <div className="order-info">
            <h1>{dish.name}</h1>
            <p>{dish.ingredients?.join(', ')}</p>
            <Image className="icon" src={dish.iconUrl || ""} alt="" />
            <DishPrice price={dish.price} />
            <DishOptions dish={dish} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <AddToBagBtn setSelectedOptions={setSelectedOptions}
                restaurant={restaurant} toggleDishOrder={toggleDishOrder}
                selectedOptions={selectedOptions} dish={dish}
            />
        </div>
    )
}