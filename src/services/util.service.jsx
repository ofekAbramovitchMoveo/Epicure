import star from '../assets/imgs/star.svg'
import emptyStar from '../assets/imgs/empty-star.svg'

export const utilService = {
    renderStars
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