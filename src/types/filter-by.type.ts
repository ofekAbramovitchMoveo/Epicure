export type FilterBy = {
    sortBy?: string | null
    isOpenNowPage?: boolean
    ratings?: number[]
    priceRange?: [number, number]
    distance?: [number, number]
    page?: number
}
