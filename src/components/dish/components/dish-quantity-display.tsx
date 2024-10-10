import Add from "@mui/icons-material/Add"
import Remove from "@mui/icons-material/Remove"
import IconButton from "@mui/material/IconButton"

import BagDishQuantityInput from "./bag-dish-quantity-input"

interface DishQuantityDisplayProps {
    dishQuantity: number
    isMobile?: boolean
    isExpanded?: boolean
    setIsExpanded?: (isExpanded: boolean) => void
    isDisabled?: boolean
    width?: string
    handleQuantityChange: (quantity: number) => void
}

export default function DishQuantityDisplay({ dishQuantity, isMobile,
    isExpanded, setIsExpanded, isDisabled, width, handleQuantityChange }: DishQuantityDisplayProps) {

    const renderBtn = (className: string, isDisabled?: boolean, onClick?: () => void) => {
        return (
            <IconButton className={`${className} btn`} disabled={isDisabled} onClick={onClick}>
                {className === 'minus' ? <Remove /> : <Add />}
            </IconButton>
        )
    }

    return (
        <>
            {renderBtn('minus', isDisabled, () => handleQuantityChange(-1))}
            <BagDishQuantityInput dishQuantity={dishQuantity || 0} isMobile={isMobile || false}
                isExpanded={isExpanded || false} setIsExpanded={setIsExpanded} width={width}
            />
            {renderBtn('plus', false, () => handleQuantityChange(1))}
        </>
    )
}