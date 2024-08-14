import restaurants from '../data/restaurants.json'

export const restaurantService = {
    query,
    getRestaurantSuggestions
}

function query() {
    return restaurants
}

function getRestaurantSuggestions(searchInput) {
    if (!searchInput) return []
    const regex = new RegExp(searchInput, 'i')
    const filteredRestaurants = restaurants.filter(restaurant => regex.test(restaurant.name))
    filteredRestaurants.map(restaurant => restaurant.type = 'restaurant')
    return filteredRestaurants
}
