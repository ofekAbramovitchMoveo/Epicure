import star from '/imgs/star.svg'
import emptyStar from '/imgs/empty-star.svg'

export const utilService = {
    renderStars,
    debounce
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