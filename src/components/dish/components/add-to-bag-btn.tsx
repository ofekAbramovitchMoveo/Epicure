import { useSelector } from "react-redux"
import { Tooltip } from "@mui/material"

import { Restaurant } from "../../../types/restaurant.type"
import { RootState } from "../../../store/store"
import { BagDish, Dish } from "../../../types/dish.type"
import { addToBag, setWarningPopup } from "../../../store/restaurant/restaurant.actions"

interface AddToBagBtnProps {
    selectedOptions: {
        sideDish: string
        changes: string[]
        quantity: number
    }
    setSelectedOptions: React.Dispatch<React.SetStateAction<{
        sideDish: string
        changes: string[]
        quantity: number
    }>>
    restaurant?: Restaurant | null
    setIsDishOrderOpen: (isDishOrderOpen: boolean) => void
    dish: Dish
}


export default function AddToBagBtn({ selectedOptions, setSelectedOptions, restaurant, setIsDishOrderOpen,
    dish }: AddToBagBtnProps) {
    const bag = useSelector((storeState: RootState) => storeState.restaurantModule.bag)
    const isDisabled = !selectedOptions.sideDish || !selectedOptions.quantity

    function clearDishOrder() {
        setSelectedOptions({
            sideDish: '',
            changes: [],
            quantity: 1,
        })
    }

    function onAddToBag() {
        if (bag.length && bag[0].restaurantId !== restaurant?._id) {
            setWarningPopup(true)
        } else {
            const dishToAdd: BagDish = { ...dish, ...selectedOptions, restaurantName: restaurant?.name }
            addToBag(dishToAdd)
            setIsDishOrderOpen(false)
            clearDishOrder()
        }
    }

    return (
        <Tooltip title={`${isDisabled ? 'Can\'t add dish to bag, must choose a side dish' : ''}`}
            placement="top" arrow PopperProps={{
                sx: {
                    zIndex: 10000
                }
            }}>
            <span>
                <button disabled={isDisabled}
                    className={`add-btn ${isDisabled ? 'disbaled' : ''}`} onClick={onAddToBag}>
                    ADD TO BAG
                </button>
            </span>
        </Tooltip>
    )
}