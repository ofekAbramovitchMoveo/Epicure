import chefs from '../data/chefs.json'

export const chefService = {
    query,
    getChefById
}

function query() {
    return chefs
}

function getChefById(chefId) {
    return chefs.find(chef => chef.id === chefId)
}
