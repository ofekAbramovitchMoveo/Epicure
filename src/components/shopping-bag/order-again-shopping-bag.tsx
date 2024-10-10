import { useMediaQuery } from "react-responsive"

import { BagDish } from "../../types/dish.type"
import BagDishList from "../dish/components/bag-dish-list"
import OrderAgainShoppingBagTitle from "./order-again-shopping-bag-title"
import ShoppingBagPrice from "./shopping-bag-price"
import ShoppingBagComments from "./shopping-bag-comments"
import OrderAgainShoppingBagBtns from "./order-again-shopping-bag-btns"

interface OrderAgainShoppingBagProps {
    bag: BagDish[]
}

export default function OrderAgainShoppingBag({ bag }: OrderAgainShoppingBagProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    function calcPrice() {
        return bag.reduce((acc, dish) => (
            acc + ((dish.price || 0) * (dish.quantity || 1))
        ), 0)
    }

    return (
        <section className="shopping-bag">
            <OrderAgainShoppingBagTitle restaurantName={bag[0].restaurantName} />
            <BagDishList bag={bag} />
            <ShoppingBagPrice isMobile={isMobile} calcPrice={calcPrice} />
            <ShoppingBagComments />
            <OrderAgainShoppingBagBtns bag={bag} />
        </section>
    )
}