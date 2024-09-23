import { FormControl } from "@mui/material"

import DishQuantityDisplay from "./dish-quantity-display"

interface DishQuantityFormProps {
    selectedOptions: {
        quantity: number
    }
    handleQuantityChange: (quantity: number) => void
}

export default function DishQuantityForm({ selectedOptions, handleQuantityChange }: DishQuantityFormProps) {
    return (
        <FormControl className="quantity-form form">
            <label className="quantity-label label">Quantity</label>
            <div className="counter" style={{ display: 'flex', alignItems: 'center' }}>
                <DishQuantityDisplay dishQuantity={selectedOptions.quantity}
                    isDisabled={selectedOptions.quantity === 1} width='50px'
                    handleQuantityChange={handleQuantityChange}
                />
            </div>
        </FormControl>
    )
}