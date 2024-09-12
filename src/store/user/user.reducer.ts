import { Action } from 'redux'
import { userService } from '../../services/user.service'
import { User } from '../../types/user.type'

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SIGN_IN_MODAL = 'SET_SIGN_IN_MODAL'
export const SET_HEADER = 'SET_HEADER'

type UserAction = Action & {
    user?: User
    users?: User[]
    userId?: string
    isSignInModalOpen?: boolean
    isHeader?: boolean
}

const initialState: {
    user?: User | null,
    users?: User[]
    watchedUser?: User
    isSignInModalOpen?: boolean
    isHeader?: boolean
} = {
    user: userService.getLoggedinUser() || null,
    users: [],
    isSignInModalOpen: false,
    isHeader: false
}

export function userReducer(state = initialState, action: UserAction) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users?.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_SIGN_IN_MODAL:
            newState = { ...state, isSignInModalOpen: !state.isSignInModalOpen }
            break
        case SET_HEADER:
            newState = { ...state, isHeader: action.isHeader }
            break
        default: return state
    }

    return newState
}