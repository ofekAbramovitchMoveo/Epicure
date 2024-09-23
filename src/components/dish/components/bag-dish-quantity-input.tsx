import { TextField } from "@mui/material"

interface BagDishQuantityInputProps {
    dishQuantity: number
    isMobile: boolean
    isExpanded?: boolean
    setIsExpanded?: (isExpanded: boolean) => void
    width?: string
}

export default function BagDishQuantityInput({ dishQuantity, isMobile, isExpanded, setIsExpanded, width }: BagDishQuantityInputProps) {

    const onFieldClick = () => {
        if (!isMobile && isExpanded) {
            setIsExpanded && setIsExpanded(false)
        }
    }

    return (
        <TextField
            onClick={onFieldClick}
            className='quantity-display'
            type="number"
            value={dishQuantity}
            inputProps={{ min: 1, style: { textAlign: 'center' } }}
            style={{ width }}
            sx={{
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                }
            }}
        />
    )
}