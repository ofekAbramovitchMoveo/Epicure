interface DishPriceProps {
    price?: number
}

export default function DishPrice({ price }: DishPriceProps) {
    return (
        <div className="price-container">
            <hr className="line" />
            <span className="price">₪{price}</span>
            <hr className="line" />
        </div>
    )
}