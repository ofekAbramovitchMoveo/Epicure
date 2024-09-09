/* eslint-disable react/prop-types */
import SideDishForm from "./side-dish-form"
import DishChangesForm from "./dish-changes-form"
import DishQuantityForm from "./dish-quantity-form"

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
            <SideDishForm dish={dish} selectedOptions={selectedOptions} handleOptionChange={handleOptionChange} />
            <DishChangesForm dish={dish} selectedOptions={selectedOptions} handleCheckboxChange={handleCheckboxChange} />
            <DishQuantityForm selectedOptions={selectedOptions} handleQuantityChange={handleQuantityChange}
                handleOptionChange={handleOptionChange} />
        </section>
    )
}