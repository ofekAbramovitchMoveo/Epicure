import { Chef } from "../types/chef.type"
import { httpService } from "./http.service"

const BASE_URL = 'chef/'

export const chefService = {
    query,
    getChefById
}

function query(): Promise<Chef[]> {
    return httpService.get(BASE_URL)
}

function getChefById(chefId: string): Promise<Chef> {
    return httpService.get(`${BASE_URL}${chefId}`)
}
