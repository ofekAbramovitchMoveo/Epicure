export type Dish = {
    _id: string
    name: string
    iconUrl: string
    ingredients: string[]
    price: number
    imgUrl: string
    isSignature: boolean
    type: string
    options: {
        sideDish: string[]
        changes: string[]
    }
    restaurant: string
}

export type BagDish = Dish & {
    restaurantName: string
    changes: string[]
    sideDish: string
    quantity: number
}