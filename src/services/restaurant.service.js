import restaurants from '../data/restaurants.json'

export const restaurantService = {
    query,
    getRestaurantSuggestions,
    getById
}

function query(filterBy = {}) {
    let filteredRestaurants = [...restaurants]

    if (filterBy.path) {
        switch (filterBy.path) {
            case '/restaurant/new':
                filteredRestaurants = filteredRestaurants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
                break
            case '/restaurant/most-popular':
                filteredRestaurants = filteredRestaurants.sort((a, b) => b.rating - a.rating).slice(0, 3)
                break
            case '/restaurant/open-now':
                filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.isOpenNow)
                break
            case '/restaurant/map':
                return filteredRestaurants
            default:
                break
        }
    }
    if (filterBy.ratings && filterBy.ratings.length) {
        filteredRestaurants = filteredRestaurants.filter(restaurant => filterBy.ratings.includes(restaurant.rating))
    }
    if (filterBy.priceRange) {
        const [minPrice, maxPrice] = filterBy.priceRange
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
            restaurant.dishes.some(dish => dish.price >= minPrice && dish.price <= maxPrice)
        )
    }
    return filteredRestaurants
}

function getById(restaurantId) {
    const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId)
    return restaurant
}

function getRestaurantSuggestions(searchInput) {
    if (!searchInput) return []
    const regex = new RegExp(searchInput, 'i')
    const filteredRestaurants = restaurants.filter(restaurant => regex.test(restaurant.name))
    filteredRestaurants.map(restaurant => restaurant.type = 'restaurant')
    return filteredRestaurants
}
