import { restaurantService } from "../../services/restaurant.service.js"
import { userService } from "../../services/user.service.js"
import { User } from "../../types/user.type.js"
import { loadBag, setWarningPopup } from "../restaurant/restaurant.actions.js"
import { CLEAR_BAG } from "../restaurant/restaurant.reducer.js"
import { store } from '../store.js'
import { SET_SIGN_IN_MODAL, SET_USER, SET_USERS } from "./user.reducer.js"

export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    }
}

export async function login(credentials: User) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        const isTransferred = restaurantService.transferGuestBag()
        if (!isTransferred) {
            setWarningPopup(true)
            logout()
        }
        loadBag()
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials: User) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        restaurantService.transferGuestBag()
        loadBag()
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        store.dispatch({ type: CLEAR_BAG })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export function toggleSignInModal() {
    store.dispatch({ type: SET_SIGN_IN_MODAL })
}