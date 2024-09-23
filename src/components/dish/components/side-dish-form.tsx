import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"

import { Dish } from "../../../types/dish.type"

interface SideDishFormProps {
    dish: Dish
    selectedOptions: {
        sideDish: string
    }
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SideDishForm({ dish, selectedOptions, handleOptionChange }: SideDishFormProps) {
    return (
        <FormControl className="sides-form form" component="fieldset">
            <label className="sides-label label">Choose a side</label>
            <RadioGroup
                name="sideDish"
                value={selectedOptions.sideDish}
                onChange={handleOptionChange}
            >
                {dish.options?.sideDish?.map(value => (
                    <FormControlLabel
                        key={value}
                        value={value}
                        control={<Radio style={{ color: 'black' }} />}
                        label={value}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}