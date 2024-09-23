import { chefService } from "../../services/chef.service"
import { store } from "../store"
import { SET_CHEF, SET_CHEFS } from "./chef.reducer"

export async function loadChefs(filterBy: { sortBy: string | null, limit: string | null } = { sortBy: null, limit: null }) {
    try {
        const chefs = await chefService.query(filterBy)
        store.dispatch({ type: SET_CHEFS, chefs })
    } catch (err) {
        console.log('chef actions: err in loadChefs', err)
    }
}

export async function loadChef(chefId: string) {
    try {
        const chef = await chefService.getChefById(chefId)
        store.dispatch({ type: SET_CHEF, chef })
    } catch (err) {
        console.log('chef actions: err in loadChef', err)
    }
}