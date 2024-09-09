import { combineReducers, compose, legacy_createStore as createStore } from 'redux'

import { chefReducer } from './chef/chef.reducer'
import { restaurantReducer } from './restaurant/restaurant.reducer'
import { Restaurant } from '../types/restaurant.type'
import { Chef } from '../types/chef.type'
import { BagDish } from '../types/dish.type'

export type RootState = {
    restaurantModule: {
        restaurants: Restaurant[],
        restaurant: Restaurant,
        bag: BagDish[],
        isBagOpen: boolean,
        isLoading: boolean
    }
    chefModule: {
        chefs: Chef[]
        chef: Chef | null
    }
}

const rootReducer = combineReducers({
    restaurantModule: restaurantReducer,
    chefModule: chefReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
