interface OrderAgainShoppingBagTitleProps {
    restaurantName?: string
}

export default function OrderAgainShoppingBagTitle({ restaurantName }: OrderAgainShoppingBagTitleProps) {

    return (
        <>
            <h1>Order Summary</h1>
            <h3 className="restaurant-name">{restaurantName}</h3>
        </>
    )
}