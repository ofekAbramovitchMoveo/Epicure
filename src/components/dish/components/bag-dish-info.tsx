import { BagDish } from "../../../types/dish.type"
import BagDishQuantity from "./bag-dish-quantity"

interface BagDishInfoProps {
    dish: BagDish
    isExpanded: boolean
    setIsExpanded: (isExpanded: boolean) => void
    onRemoveDish: (dishId: string) => void
    isMobile: boolean
}

export default function BagDishInfo({ dish, isExpanded, setIsExpanded, onRemoveDish, isMobile }: BagDishInfoProps) {

    return (
        <div className={`dish-info ${isExpanded ? 'expanded' : ''}`}>
            <div className="dish-details">
                <div className="dish-metadata">
                    <BagDishQuantity isMobile={isMobile} dish={dish}
                        isExpanded={isExpanded}
                        setIsExpanded={setIsExpanded}
                        onRemoveDish={onRemoveDish}
                    />
                    <div className="container">
                        <h3 className="dish-name">{dish.name}</h3>
                        <p>₪{(dish.price || 0).toFixed(2)}</p>
                    </div>
                </div>
                <div className={`dish-options-order ${isExpanded && !isMobile ? 'expanded' : ''}`}>
                    <p>{dish.sideDish} | {dish.changes?.length ? dish.changes?.join(', ') : 'No changes'}</p>
                </div>
            </div>
            <span className="price">₪{dish.price}</span>
        </div>
    )
}