import { chefService } from "../../services/chef.service"
import { Chef } from "../../types/chef.type"
import { store } from "../store"
import { APPEND_CHEFS, SET_CHEF, SET_CHEFS } from "./chef.reducer"

export async function loadChefs(filterBy: { sortBy?: string | null, limit?: string | null, page?: number } = {}): Promise<{ items: Chef[], totalCount: number } | undefined> {
    try {
        const { chefs, totalCount } = await chefService.query(filterBy)
        store.dispatch({
            type: filterBy.page && filterBy.page > 1 ? APPEND_CHEFS : SET_CHEFS,
            chefs
        })
        return { items: chefs, totalCount }
    } catch (err) {
        console.log('chef actions: err in loadChefs', err)
    }
}

export async function loadChef(chefId: string) {
    try {
        const chef = await chefService.getChefById(chefId)
        store.dispatch({ type: SET_CHEF, chef })
        return chef
    } catch (err) {
        console.log('chef actions: err in loadChef', err)
    }
}