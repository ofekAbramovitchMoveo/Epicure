import restaurants from '../data/restaurants.json'

export const restaurantService = {
    query,
    getRestaurantSuggestions,
    getById,
    getUserLocation
}

function query(filterBy = {}) {
    let filteredRestaurants = [...restaurants]
    const basePath = '/restaurants/'

    if (filterBy.path) {
        switch (filterBy.path) {
            case `${basePath}new`:
                filteredRestaurants = filteredRestaurants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
                break
            case `${basePath}most-popular`:
                filteredRestaurants = filteredRestaurants.sort((a, b) => b.rating - a.rating).slice(0, 3)
                break
            case `${basePath}open-now`:
                filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.isOpenNow)
                break
            case `${basePath}map`:
                break
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
    if (filterBy.distance) {
        return getUserLocation().then(userLocation => {
            filteredRestaurants = filteredRestaurants.filter(restaurant => {
                const distance = calculateDistance(userLocation, restaurant.location)
                return distance <= filterBy.distance[1]
            })
            return filteredRestaurants
        }).catch(err => {
            console.error('Error getting user location:', err)
            return filteredRestaurants
        })
    }
    return Promise.resolve(filteredRestaurants)
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

function getUserLocation() {
    return new Promise((res, rej) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords
                    res({ lat: latitude, lng: longitude })
                },
                err => {
                    rej(err)
                }
            )
        } else {
            rej(new Error('Geolocation is not supported by this browser.'))
        }
    })
}

function calculateDistance(location1, location2) {
    const { lat: lat1, lng: lng1 } = location1
    const { lat: lat2, lng: lng2 } = location2
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lng2 - lng1) * Math.PI / 180
    const a = 0.5 - Math.cos(dLat) / 2 + Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2
    return R * 2 * Math.asin(Math.sqrt(a))
}
