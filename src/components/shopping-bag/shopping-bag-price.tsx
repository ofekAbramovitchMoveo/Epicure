interface ShoppingBagPriceProps {
    isMobile: boolean
    calcPrice: () => number
}

export default function ShoppingBagPrice({ isMobile, calcPrice }: ShoppingBagPriceProps) {

    return (
        <div className="price-container">
            <hr className="line" />
            <span className="price">
                {isMobile && <span className="total">TOTAL - </span>}
                {`₪${calcPrice()}`}
            </span>
            <hr className="line" />
        </div>
    )
}