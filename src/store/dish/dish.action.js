import { dishService } from "../../services/dish.service"
import { store } from "../store"
import { SET_DISHES } from "./dish.reducer"


export function loadDishes() {
    try {
        const dishes = dishService.query()
        store.dispatch({ type: SET_DISHES, dishes })
    } catch (err) {
        console.log('dish action: err in loadDishes', err)
    }
}