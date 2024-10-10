
interface CheckoutShoppingBagTitleProps {
    isMobile: boolean
    restaurantName?: string
}

export default function CheckoutShoppingBagTitle({ isMobile, restaurantName }: CheckoutShoppingBagTitleProps) {

    return (
        <>
            <h1>YOUR ORDER</h1>
            {!isMobile && <h3 className="restaurant-name">{restaurantName}</h3>}
        </>
    )
}