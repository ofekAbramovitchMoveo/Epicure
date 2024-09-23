interface RestaurantListTitleProps {
    isChefRestaurants: boolean
    chefId: string
    getChefName: (chefId: string) => string | undefined
}

export default function RestaurantListTitle({ isChefRestaurants, chefId, getChefName }: RestaurantListTitleProps) {
    return (
        <>
            {!isChefRestaurants && !location.pathname.includes('/restaurants') && (
                <h2 className="restaurant-list-title">popular restaurants in epicure:</h2>
            )}
            {isChefRestaurants && <h2 className="restaurant-list-title-chef">{getChefName(chefId || '')?.split(' ')[0]}{`'`}s Restaurants</h2>}
        </>
    )
}