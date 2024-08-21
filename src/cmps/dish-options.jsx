/* eslint-disable react/prop-types */
import { Add, Remove } from "@mui/icons-material"
import { Checkbox, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from "@mui/material"

export default function DishOptions({ dish, selectedOptions, setSelectedOptions }) {

    function handleOptionChange({ target }) {
        const { name: field, value } = target
        setSelectedOptions(prevOptions => ({ ...prevOptions, [field]: value }))
    }

    function handleCheckboxChange({ target }, value) {
        const { name: field } = target
        setSelectedOptions(prevState => {
            const newChanges = prevState.changes.includes(value) ?
                prevState.changes.filter(change => change !== value) :
                [...prevState.changes, value]
            return {
                ...prevState,
                [field]: newChanges,
            }
        })
    }

    function handleQuantityChange(change) {
        setSelectedOptions(prevState => ({
            ...prevState,
            quantity: Math.max(1, prevState.quantity + change),
        }))
    }

    return (
        <section className="dish-options">
            <FormControl className="sides-form form" component="fieldset">
                <label className="sides-label label">Choose a side</label>
                <RadioGroup
                    name="sideDish"
                    value={selectedOptions.sideDish}
                    onChange={handleOptionChange}
                >
                    {dish.options.sideDish.map(value => (
                        <FormControlLabel
                            key={value}
                            value={value}
                            control={<Radio style={{ color: 'black' }} />}
                            label={value}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <FormControl className="changes-form form" component="fieldset">
                <label className="changes-label label">Changes</label>
                {dish.options.changes.map(value => (
                    <FormControlLabel
                        key={value}
                        control={
                            <Checkbox
                                name="changes"
                                checked={selectedOptions.changes.includes(value)}
                                onChange={ev => handleCheckboxChange(ev, value)}
                                sx={{
                                    color: "black",
                                    '&.Mui-checked': {
                                        color: "white",
                                    }
                                }}
                            />
                        }
                        label={value}
                    />
                ))}
            </FormControl>
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
                                '-webkit-appearance': 'none',
                            }
                        }}
                    />
                    <IconButton onClick={() => handleQuantityChange(1)}>
                        <Add />
                    </IconButton>
                </div>
            </FormControl>
        </section>
    )
}