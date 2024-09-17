import star from '/imgs/star.svg'
import emptyStar from '/imgs/empty-star.svg'
import { Coordinates } from '../components/map/map'

export const utilService = {
    renderStars,
    debounce,
    getUserLocation,
    areArraysEqual
}

function renderStars(rating: number) {
    const totalStars = 5
    const stars = []

    for (let i = 0; i < totalStars; i++) {
        if (i < rating) {
            stars.push(<img src={star} alt='' key={i} className="filled-star"></img>)
        } else {
            stars.push(<img src={emptyStar} alt='' key={i} className="empty-star"></img>)
        }
    }
    return stars
}

function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}

function getUserLocation(): Promise<Coordinates | null> {
    return new Promise((res, rej) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords
                    res({ lat: latitude, lng: longitude })
                },
                err => {
                    rej(err)
                }
            )
        } else {
            rej(new Error('Geolocation is not supported by this browser.'))
        }
    })
}

function areArraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false
    return arr1.every((item, index) => JSON.stringify(item) === JSON.stringify(arr2[index]))
}