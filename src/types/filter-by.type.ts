export type FilterBy = {
    sortBy?: string | null
    path?: string
    ratings?: number[]
    priceRange?: [number, number]
    distance?: [number, number]
}