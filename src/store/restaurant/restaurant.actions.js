import { restaurantService } from "../../services/restaurant.service"
import { store } from "../store"
import { SET_RESTAURANT, SET_RESTAURANTS } from "./restaurant.reducer"


export function loadRestaurants(filterBy = {}) {
    try {
        const restaurants = restaurantService.query(filterBy)
        store.dispatch({ type: SET_RESTAURANTS, restaurants })
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurants', err)
    }
}

export function loadRestaurant(restaurantId) {
    const restaurant = restaurantService.getById(restaurantId)
    store.dispatch({ type: SET_RESTAURANT, restaurant })
}