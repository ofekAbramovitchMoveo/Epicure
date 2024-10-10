import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Link } from "react-router-dom"

import { toggleBag } from "../../store/restaurant/restaurant.actions"
import { RootState } from "../../store/store"
import { toggleSignInModal } from "../../store/user/user.actions"
import { BagDish } from "../../types/dish.type"
import SignInModal from "../sign-in/sign-in-modal"
import Image from "../image"
import BagDishList from "../dish/components/bag-dish-list"
import ShoppingBagBtns from "./shopping-bag-btns"
import ShoppingBagTitle from "./shopping-bag-title"
import ShoppingBagPrice from "./shopping-bag-price"
import ShoppingBagComments from "./shopping-bag-comments"

interface ShoppingBagProps {
    bag: BagDish[]
    isDisabled?: boolean
}

export default function ShoppingBag({ bag, isDisabled }: ShoppingBagProps) {
    const isSignInModalOpen = useSelector((storeState: RootState) => storeState.userModule.isSignInModalOpen)
    const isHeader = useSelector((storeState: RootState) => storeState.userModule.isHeader)
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    function calcPrice() {
        return bag.reduce((acc, dish) => (
            acc + ((dish.price || 0) * (dish.quantity || 1))
        ), 0)
    }

    function onOrderHistory() {
        toggleBag()
    }

    if (!bag?.length) return (
        <>
            <div className="empty-bag">
                <Image src="bag-modal.svg" alt="" />
                <h4>YOUR BAG IS <br /> EMPTY</h4>
            </div>
            <Link onClick={onOrderHistory} className="order-btn" to='/order-history'>ORDER HISTORY</Link>
        </>
    )
    return (
        <>
            <section className="shopping-bag">
                <ShoppingBagTitle restaurantName={bag[0].restaurantName} />
                <BagDishList bag={bag} />
                <ShoppingBagPrice isMobile={isMobile} calcPrice={calcPrice} />
                <ShoppingBagComments />
                <ShoppingBagBtns isDisabled={isDisabled} isBagOpen={isBagOpen} onOrderHistory={onOrderHistory} />
            </section>
            {isSignInModalOpen && <SignInModal isOpen={isSignInModalOpen}
                toggleModal={toggleSignInModal}
                isHeader={isHeader}
                bag={bag}
            />}
        </>
    )
}