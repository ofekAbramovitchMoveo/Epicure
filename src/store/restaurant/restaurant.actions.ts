import { restaurantService } from "../../services/restaurant.service"
import { BagDish } from "../../types/dish.type"
import { Restaurant } from "../../types/restaurant.type"
import { store } from "../store"
import { ADD_TO_BAG, CLEAR_BAG, REMOVE_FROM_BAG, SET_BAG, SET_RESTAURANT, SET_RESTAURANTS, SET_WARNING_POPUP, TOGGLE_BAG_MODAL, UPDATE_DISH_QUANTITY } from "./restaurant.reducer"

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
