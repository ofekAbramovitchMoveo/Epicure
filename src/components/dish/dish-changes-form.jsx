/* eslint-disable react/prop-types */
import { Checkbox, FormControl, FormControlLabel } from "@mui/material"

export default function DishChangesForm({ dish, selectedOptions, handleCheckboxChange }) {
    return (
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
    )
}