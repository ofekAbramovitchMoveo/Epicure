import { httpService } from "./http.service"

const BASE_URL = 'chef/'

export const chefService = {
    query,
    getChefById
}

function query() {
    return httpService.get(BASE_URL)
}

function getChefById(chefId) {
    return httpService.get(`${BASE_URL}${chefId}`)
}
