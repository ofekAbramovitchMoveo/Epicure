export type Restaurant = {
    _id: string
    name: string
    chefId: string
    rating: number
    imgUrl: string
    createdAt: string
    openingHours: OpeningHours[]
    location: {
        type: string
        coordinates: number[]
    }
    dishesIds: string[]
}

export type OpeningHours = {
    day: number
    open: number
    close: number
}

export type Suggestion = Restaurant & {
    type: string
}