import { Chef } from "../types/chef.type"
import { httpService } from "./http.service"

const BASE_URL = 'chef/'

export const chefService = {
    query,
    getChefById,
    incrementViewCount
}

function query(filterBy: { sortBy: string | null, limit: string | null }): Promise<Chef[]> {
    const queryString = filterBy.sortBy ? `?sortBy=${filterBy.sortBy}&limit=${filterBy.limit}` : ''
    return httpService.get(`${BASE_URL}${queryString}`)
}

function getChefById(chefId: string): Promise<Chef> {
    return httpService.get(`${BASE_URL}${chefId}`)
}

async function incrementViewCount(chefId: string): Promise<void> {
    await httpService.put(`${BASE_URL}${chefId}/view`, {})
}
