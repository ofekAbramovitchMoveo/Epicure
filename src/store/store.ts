import { combineReducers, compose, legacy_createStore as createStore } from 'redux'

import { chefReducer } from './chef/chef.reducer'
import { restaurantReducer } from './restaurant/restaurant.reducer'
import { Restaurant } from '../types/restaurant.type'
import { userReducer } from './user/user.reducer'
import { Chef } from '../types/chef.type'
import { BagDish } from '../types/dish.type'
import { User } from '../types/user.type'

export type RootState = {
    restaurantModule: {
        restaurants: Restaurant[]
        restaurant: Restaurant
        bag: BagDish[]
        isBagOpen: boolean
        isLoading: boolean
    }
    chefModule: {
        chefs: Chef[]
        chef: Chef | null
    }
    userModule: {
        users: User[]
        user: User
        isSignInModalOpen: boolean
        isHeader: boolean
    }
}

const rootReducer = combineReducers({
    restaurantModule: restaurantReducer,
    chefModule: chefReducer,
    userModule: userReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
