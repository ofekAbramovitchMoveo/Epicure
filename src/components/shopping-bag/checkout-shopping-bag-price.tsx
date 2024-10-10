interface CheckoutShoppingBagPriceProps {
    isMobile: boolean
    calcPrice: () => number
}

export default function CheckoutShoppingBagPrice({ isMobile, calcPrice }: CheckoutShoppingBagPriceProps) {

    return (
        <div className="price-container">
            <hr className="line" />
            <span className="price">
                {isMobile && <span className="total">TOTAL - </span>}
                {isMobile && `₪${calcPrice()}`}
            </span>
        </div>
    )
}