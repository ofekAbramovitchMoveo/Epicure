export type Restaurant = {
    _id: string
    name: string
    chef: string
    rating: number
    imgUrl: string
    createdAt: string
    isOpenNow: boolean
    location: {
        type: string
        coordinates: number[]
    }
    dishes: string[]
}

export type Suggestion = Restaurant & {
    type: string
}