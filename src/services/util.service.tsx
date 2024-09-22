import Image from '../components/image'
import { Coordinates } from '../App'

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
            stars.push(<Image src="star.svg" alt='' key={i} className="filled-star" />)
        } else {
            stars.push(<Image src="empty-star.svg" alt='' key={i} className="empty-star" />)
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
    return new Promise((res) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords
                    res({ lat: latitude, lng: longitude })
                },
                err => {
                    console.log('Geolocation error:', err)
                    res(null)
                }
            )
        } else {
            console.log('Geolocation is not supported by this browser.')
            res(null)
        }
    })
}

function areArraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false
    return arr1.every((item, index) => JSON.stringify(item) === JSON.stringify(arr2[index]))
}