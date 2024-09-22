import { Chef } from "../types/chef.type"
import { httpService } from "./http.service"

const BASE_URL = 'chef/'

export const chefService = {
    query,
    getChefById,
    incrementViewCount
}

function query(filterBy: { path: string }): Promise<Chef[]> {
    const queryString = filterBy.path ? `?path=${filterBy.path}` : ''
    return httpService.get(`${BASE_URL}${queryString}`)
}

function getChefById(chefId: string): Promise<Chef> {
    return httpService.get(`${BASE_URL}${chefId}`)
}

async function incrementViewCount(chefId: string): Promise<void> {
    await httpService.put(`${BASE_URL}${chefId}/view`, {})
}
