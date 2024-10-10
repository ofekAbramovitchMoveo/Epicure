import { restaurantService } from "../../services/restaurant.service"
import { BagDish } from "../../types/dish.type"
import { FilterBy } from "../../types/filter-by.type"
import { Restaurant } from "../../types/restaurant.type"
import { store } from "../store"
import { ADD_TO_BAG, APPEND_RESTAURANTS, CLEAR_BAG, REMOVE_FROM_BAG, RESET_RESTAURANTS, SET_BAG, SET_RESTAURANT, SET_RESTAURANTS, SET_WARNING_POPUP, TOGGLE_BAG_MODAL, TOGGLE_LOCATION_WARNING_POPUP, UPDATE_DISH_QUANTITY } from "./restaurant.reducer"

export async function loadRestaurants(filterBy: FilterBy = {}): Promise<{ items: Restaurant[], totalCount: number } | undefined> {
    try {
        const { restaurants, totalCount } = await restaurantService.query(filterBy)
        store.dispatch({
            type: filterBy.page && filterBy.page > 1 ? APPEND_RESTAURANTS : SET_RESTAURANTS,
            restaurants
        })
        return { items: restaurants, totalCount }
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurants', err)
        return undefined
    }
}

export async function loadRestaurant(restaurantId: string): Promise<Restaurant | null> {
    try {
        const restaurant: Restaurant = await restaurantService.getById(restaurantId)
        store.dispatch({ type: SET_RESTAURANT, restaurant })
        return restaurant
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurant', err)
        return null
    }
}

export function resetRestaurants(): void {
    store.dispatch({ type: RESET_RESTAURANTS })
}

export function loadBag(): void {
    const bag: BagDish[] = restaurantService.getBag()
    store.dispatch({ type: SET_BAG, bag })
}

export function setBag(bag: BagDish[]): void {
    restaurantService.saveBag(bag)
    store.dispatch({ type: SET_BAG, bag })
}

export function addToBag(dish: BagDish): void {
    restaurantService.addToBag(dish)
    store.dispatch({ type: ADD_TO_BAG, dish })
    toggleBag()
}

export function removeFromBag(dishId: string): void {
    restaurantService.removeFromBag(dishId)
    store.dispatch({ type: REMOVE_FROM_BAG, dishId })
}

export function clearBag(): void {
    restaurantService.clearBag()
    store.dispatch({ type: CLEAR_BAG })
}

export function toggleBag(): void {
    store.dispatch({ type: TOGGLE_BAG_MODAL })
}

export function updateDishQuantity(dishId: string, quantity: number): void {
    restaurantService.updateDishQuantity(dishId, quantity)
    store.dispatch({ type: UPDATE_DISH_QUANTITY, dishId, quantity })
}

export function setWarningPopup(isWarningPopupOpen: boolean): void {
    store.dispatch({ type: SET_WARNING_POPUP, isWarningPopupOpen })
}

export function toggleLocationWarningPopup(): void {
    store.dispatch({ type: TOGGLE_LOCATION_WARNING_POPUP })
}
