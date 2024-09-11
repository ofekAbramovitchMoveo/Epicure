import { Action } from "redux"

import { Chef } from "../../types/chef.type"

export const SET_CHEFS = 'SET_CHEFS'
export const SET_CHEF = 'SET_CHEF'

type ChefAction = Action & {
    chefs?: Chef[],
    chef?: Chef | null
}

const initialState: {
    chefs: Chef[],
    chef?: Chef | null
} = {
    chefs: [],
    chef: null
}

export function chefReducer(state = initialState, action: ChefAction) {
    switch (action.type) {
        case SET_CHEFS:
            return { ...state, chefs: action.chefs }
        case SET_CHEF:
            return { ...state, chef: action.chef }
        default:
            return state
    }
}