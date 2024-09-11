import SideDishForm from "./side-dish-form"
import DishChangesForm from "./dish-changes-form"
import DishQuantityForm from "./dish-quantity-form"
import { Dish } from "../../types/dish.type"

interface DishOptionsProps {
    dish: Dish
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
}

export default function DishOptions({ dish, selectedOptions, setSelectedOptions }: DishOptionsProps) {

    function handleOptionChange({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name: field, value } = target
        setSelectedOptions(prevOptions => ({ ...prevOptions, [field]: value }))
    }

    function handleCheckboxChange({ target }: React.ChangeEvent<HTMLInputElement>, value: string) {
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

    function handleQuantityChange(change: number) {
        setSelectedOptions(prevState => ({
            ...prevState,
            quantity: Math.max(1, prevState.quantity + change),
        }))
    }

    return (
        <section className="dish-options">
            <SideDishForm dish={dish} selectedOptions={selectedOptions} handleOptionChange={handleOptionChange} />
            <DishChangesForm dish={dish} selectedOptions={selectedOptions} handleCheckboxChange={handleCheckboxChange} />
            <DishQuantityForm selectedOptions={selectedOptions} handleQuantityChange={handleQuantityChange}
                handleOptionChange={handleOptionChange} />
        </section>
    )
}