/* eslint-disable react/prop-types */
import { Add, Remove } from "@mui/icons-material"
import { FormControl, IconButton, TextField } from "@mui/material"

export default function DishQuantityForm({ selectedOptions, handleQuantityChange, handleOptionChange }) {
    return (
        <FormControl className="quantity-form form">
            <label className="quantity-label label">Quantity</label>
            <div className="counter" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton disabled={selectedOptions.quantity === 1} onClick={() => handleQuantityChange(-1)}>
                    <Remove />
                </IconButton>
                <TextField
                    type="number"
                    value={selectedOptions.quantity}
                    onChange={ev => handleOptionChange('quantity', parseInt(ev.target.value, 10))}
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    style={{ width: '50px' }}
                    sx={{
                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                        }
                    }}
                />
                <IconButton onClick={() => handleQuantityChange(1)}>
                    <Add />
                </IconButton>
            </div>
        </FormControl>
    )
}