import Image from "../../image"
import { Dish } from "../../../types/dish.type"
import AppFooter from "../../app-footer"
import { Restaurant } from "../../../types/restaurant.type"
import DishOrderInfo from "./dish-order-info"

interface DishOrderBoxProps {
    isMobile: boolean
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

export default function DishOrderBox({ isMobile, dish, toggleDishOrder, selectedOptions,
    setSelectedOptions, restaurant }: DishOrderBoxProps) {

    return (
        <>
            <Image src={isMobile ? "close.svg" : "close-white.svg"} alt="" onClick={toggleDishOrder} className="close-icon" />
            <Image src={dish.imgUrl || ""} alt="" className="dish-img full" />
            <DishOrderInfo dish={dish} toggleDishOrder={toggleDishOrder}
                selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
                restaurant={restaurant}
            />
            <div className="container full">
                {isMobile && (
                    <AppFooter />
                )}
            </div>
        </>
    )
}