import { Checkbox, FormControl, FormControlLabel } from "@mui/material"

import { Dish } from "../../../types/dish.type"

interface DishChangesFormProps {
    dish: Dish
    selectedOptions: {
        changes: string[]
    }
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
}

export default function DishChangesForm({ dish, selectedOptions, handleCheckboxChange }: DishChangesFormProps) {
    return (
        <FormControl className="changes-form form" component="fieldset">
            <label className="changes-label label">Changes</label>
            {dish.options?.changes?.map(value => (
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