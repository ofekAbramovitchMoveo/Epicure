import { restaurantService } from "../../services/restaurant.service"
import { store } from "../store"
import { SET_RESTAURANT, SET_RESTAURANTS, TOGGLE_BAG_MODAL, UPDATE_DISH_QUANTITY } from "./restaurant.reducer"

export async function loadRestaurants(filterBy = {}) {
    try {
        const restaurants = await restaurantService.query(filterBy)
        store.dispatch({ type: SET_RESTAURANTS, restaurants })
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurants', err)
    }
}

export function loadRestaurant(restaurantId) {
    try {
        const restaurant = restaurantService.getById(restaurantId)
        store.dispatch({ type: SET_RESTAURANT, restaurant })
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurant', err)
    }
}

export function toggleBag() {
    store.dispatch({ type: TOGGLE_BAG_MODAL })
}

export function updateDishQuantity(dishId, quantity) {
    store.dispatch({ type: UPDATE_DISH_QUANTITY, dishId, quantity })
}