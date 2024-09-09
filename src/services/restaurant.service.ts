import { Dish } from '../types/dish.type'
import { FilterBy } from '../types/filter-by.type'
import { Restaurant, Suggestion } from '../types/restaurant.type'
import { httpService } from './http.service'
import { utilService } from './util.service'

const BASE_URL = 'restaurant/'

export const restaurantService = {
    query,
    getRestaurantSuggestions,
    getById,
    getDishes,
}

async function query(filterBy: FilterBy = {}): Promise<Restaurant[]> {
    const queryParams = new URLSearchParams(Object.entries(filterBy).flatMap(([key, value]) => (
        Array.isArray(value) ? value.map(val => [key, val.toString()]) : [[key, value.toString()]]
    )))

    const userLocation = await utilService.getUserLocation()
    queryParams.append('userLocation', JSON.stringify(userLocation))
    return httpService.get(`${BASE_URL}?${queryParams}`)
}

function getById(restaurantId: string): Promise<Restaurant> {
    return httpService.get(`${BASE_URL}${restaurantId}`)
}

function getDishes(restaurantId: string): Promise<Dish[]> {
    return httpService.get(`${BASE_URL}${restaurantId}/dish`)
}

async function getRestaurantSuggestions(searchInput: string): Promise<Suggestion[]> {
    if (!searchInput) return Promise.resolve([])
    const suggestions = await httpService.get(`${BASE_URL}suggestions?search=${searchInput}`)
    suggestions.map((suggestion: Suggestion) => suggestion.type = 'restaurant')
    return suggestions
}
