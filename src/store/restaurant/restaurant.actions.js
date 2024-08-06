import { restaurantService } from "../../services/restaurant.service"
import { store } from "../store"
import { SET_RESTAURANTS } from "./restaurant.reducer"


export function loadRestaurants() {
    try {
        const restaurants = restaurantService.query()
        store.dispatch({ type: SET_RESTAURANTS, restaurants })
    } catch (err) {
        console.log('RestaurantActions: err in loadRestaurants', err)
    }
}