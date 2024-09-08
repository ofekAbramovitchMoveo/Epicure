import star from '/imgs/star.svg'
import emptyStar from '/imgs/empty-star.svg'

export const utilService = {
    renderStars,
    debounce,
    getUserLocation
}

function renderStars(rating) {
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

function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}

function getUserLocation() {
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