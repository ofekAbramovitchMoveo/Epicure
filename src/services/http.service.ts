import Axios, { isAxiosError } from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'http://34.207.171.151:3030/api/'
    : '//localhost:3030/api/'

var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint: string, data?: any) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint: string, data: any) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data: any) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data: any) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint: string, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (isAxiosError(err) && err.response) {
            if (err.response.status === 401) {
                sessionStorage.clear()
            }
            if (err.response.status === 500) {
                window.location.assign('/')
            }
        }
        throw err
    }
}