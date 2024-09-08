import { httpService } from './http.service'
import { utilService } from './util.service'

const BASE_URL = 'restaurant/'

export const restaurantService = {
    query,
    getRestaurantSuggestions,
    getById,
    getDishes,
}

async function query(filterBy = {}) {
    const queryParams = new URLSearchParams(Object.entries(filterBy).flatMap(([key, value]) => (
        Array.isArray(value) ? value.map(val => [key, val]) : [[key, value]]
    )))

    const userLocation = await utilService.getUserLocation()
    queryParams.append('userLocation', JSON.stringify(userLocation))
    return httpService.get(`${BASE_URL}?${queryParams}`)
}

function getById(restaurantId) {
    return httpService.get(`${BASE_URL}${restaurantId}`)
}

function getDishes(restaurantId) {
    return httpService.get(`${BASE_URL}${restaurantId}/dish`)
}

async function getRestaurantSuggestions(searchInput) {
    if (!searchInput) return Promise.resolve([])
    const suggestions = await httpService.get(`${BASE_URL}suggestions?search=${searchInput}`)
    suggestions.map(suggestion => suggestion.type = 'restaurant')
    return suggestions
}
