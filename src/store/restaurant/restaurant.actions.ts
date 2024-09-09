import { restaurantService } from "../../services/restaurant.service"
import { Restaurant } from "../../types/restaurant.type"
import { store } from "../store"
import { SET_RESTAURANT, SET_RESTAURANTS, TOGGLE_BAG_MODAL, UPDATE_DISH_QUANTITY } from "./restaurant.reducer"

export async function loadRestaurants(filterBy = {}): Promise<void> {
    try {
        const restaurants: Restaurant[] = await restaurantService.query(filterBy)
        store.dispatch({ type: SET_RESTAURANTS, restaurants })
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurants', err)
    }
}

export async function loadRestaurant(restaurantId: string): Promise<void> {
    try {
        const restaurant: Restaurant = await restaurantService.getById(restaurantId)
        store.dispatch({ type: SET_RESTAURANT, restaurant })
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurant', err)
    }
}

export function toggleBag(): void {
    store.dispatch({ type: TOGGLE_BAG_MODAL })
}

export function updateDishQuantity(dishId: string, quantity: number): void {
    store.dispatch({ type: UPDATE_DISH_QUANTITY, dishId, quantity })
}