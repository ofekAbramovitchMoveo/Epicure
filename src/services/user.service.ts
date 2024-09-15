import { User } from '../types/user.type'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
}

declare global {
    interface Window {
        userService: typeof userService
    }
}

window.userService = userService

function getUsers() {
    return httpService.get(BASE_URL)
}

async function getById(userId: string) {
    return httpService.get(BASE_URL + userId)
}

async function login(userCred: User) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return saveLocalUser(user)
}

async function signup(userCred: User) {
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout', {})
}

function saveLocalUser(user: User) {
    delete user.password
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || ''
    return user ? JSON.parse(user) : null
}