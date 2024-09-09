/* eslint-disable react/prop-types */
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"

export default function SideDishForm({ dish, selectedOptions, handleOptionChange }) {
    return (
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
    )
}