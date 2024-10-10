interface ShoppingBagTitleProps {
    restaurantName?: string
}

export default function ShoppingBagTitle({ restaurantName }: ShoppingBagTitleProps) {

    return (
        <>
            <h1>YOUR ORDER</h1>
            <h3 className="restaurant-name">{restaurantName}</h3>
        </>
    )
}