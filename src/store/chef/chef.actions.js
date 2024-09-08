import { chefService } from "../../services/chef.service"
import { store } from "../store"
import { SET_CHEFS } from "./chef.reducer"

export async function loadChefs() {
    try {
        const chefs = await chefService.query()
        store.dispatch({ type: SET_CHEFS, chefs })
    } catch (err) {
        console.log('chef actions: err in loadChefs', err)
    }
}