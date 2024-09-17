import { BagDish, Dish } from '../types/dish.type'
import { FilterBy } from '../types/filter-by.type'
import { Restaurant, Suggestion } from '../types/restaurant.type'
import { httpService } from './http.service'
import { userService } from './user.service'
import { utilService } from './util.service'

const STORAGE_KEY_PREFIX_USER_BAG = 'userBag'
const STORAGE_KEY_PREFIX_GUEST_BAG = 'guestBag'
const BASE_URL = 'restaurant/'

export const restaurantService = {
    query,
    getRestaurantSuggestions,
    getById,
    getDishes,
    getBag,
    saveBag,
    clearBag,
    transferGuestBag,
    addToBag,
    removeFromBag,
    updateDishQuantity
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

function getBag(): BagDish[] {
    const userId = userService.getLoggedinUser()?._id
    const key = userId ? STORAGE_KEY_PREFIX_USER_BAG + userId : STORAGE_KEY_PREFIX_GUEST_BAG
    const bag = localStorage.getItem(key)
    return bag ? JSON.parse(bag) : []
}

function addToBag(newDish: BagDish): void {
    const bag = getBag()
    const existingDishIndex = bag.findIndex(dish =>
        dish._id === newDish._id &&
        JSON.stringify(dish.sideDish) === JSON.stringify(newDish.sideDish) &&
        utilService.areArraysEqual(dish.changes || [], newDish.changes || [])
    )

    if (existingDishIndex !== -1) {
        const updatedBag = bag.map((dish, index) =>
            index === existingDishIndex
                ? { ...dish, quantity: (dish.quantity || 0) + (newDish.quantity || 1) }
                : dish
        )
        saveBag(updatedBag)
    } else {
        const bagId = `${newDish._id}_${Date.now()}`
        const uniqueDish = { ...newDish, bagId, quantity: newDish.quantity || 1 }
        saveBag([...bag, uniqueDish])
    }
}

function removeFromBag(dishId: string): void {
    const bag = getBag()
    const updatedBag = bag.filter(dish => dish.bagId !== dishId)
    saveBag(updatedBag)
}

function saveBag(bag: BagDish[]): void {
    const userId = userService.getLoggedinUser()?._id
    const key = userId ? STORAGE_KEY_PREFIX_USER_BAG + userId : STORAGE_KEY_PREFIX_GUEST_BAG
    localStorage.setItem(key, JSON.stringify(bag))
}

function updateDishQuantity(dishId: string, quantity: number): void {
    const bag = getBag()
    const updatedBag = bag.map(dish => dish.bagId === dishId ? { ...dish, quantity } : dish)
    saveBag(updatedBag)
}

function clearBag(): void {
    const userId = userService.getLoggedinUser()?._id
    const key = userId ? STORAGE_KEY_PREFIX_USER_BAG + userId : STORAGE_KEY_PREFIX_GUEST_BAG
    localStorage.removeItem(key)
}

function transferGuestBag(): boolean {
    const userId = userService.getLoggedinUser()?._id
    if (!userId) return false

    const guestKey = STORAGE_KEY_PREFIX_GUEST_BAG
    const guestBag = JSON.parse(localStorage.getItem(guestKey) || '[]')
    const userBag = getBag()

    if (guestBag.length && userBag.length) {
        const guestRestaurant = guestBag[0].restaurant
        const userRestaurant = userBag[0].restaurant
        if (guestRestaurant !== userRestaurant) {
            return false
        }
    }

    if (guestBag?.length) {
        guestBag.forEach((guestDish: BagDish) => {
            addToBag(guestDish)
        })
        localStorage.removeItem(guestKey)
    }

    return true
}
