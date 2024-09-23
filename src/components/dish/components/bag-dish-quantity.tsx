import { updateDishQuantity } from "../../../store/restaurant/restaurant.actions"
import { BagDish } from "../../../types/dish.type"
import Image from "../../image"
import DishQuantityDisplay from './dish-quantity-display'

interface BagDishQuantityProps {
    isMobile?: boolean
    dish: BagDish
    isExpanded: boolean
    setIsExpanded: (isExpanded: boolean) => void
    onRemoveDish: (dishId: string) => void
}

export default function BagDishQuantity({ isMobile, dish, isExpanded, setIsExpanded, onRemoveDish }: BagDishQuantityProps) {

    const onQuantityClick = () => {
        if (!isMobile && !isExpanded) {
            setIsExpanded(true)
        }
    }

    function handleQuantityChange(change: number) {
        const newQuantity = Math.max(1, (dish.quantity || 0) + change)
        updateDishQuantity(dish.bagDishId || '', newQuantity)
    }

    return (
        <div className={`quantity ${isExpanded ? 'expanded' : 'clickable'}`}
            onClick={onQuantityClick}
        >
            {isExpanded && !isMobile ? (
                <>
                    <DishQuantityDisplay dishQuantity={dish.quantity || 1}
                        isMobile={isMobile || false} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
                        isDisabled={dish.quantity === 1}
                        handleQuantityChange={handleQuantityChange}
                    />
                    <Image src="trash.svg" alt="" onClick={() => onRemoveDish(dish.bagDishId || '')} className="trash-icon" />
                </>
            ) : (
                dish.quantity
            )}
            {isMobile ? ' x' : ''}
        </div>
    )
}