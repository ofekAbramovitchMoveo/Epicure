/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


export default function DishPreview({ dish }) {


    return (
        <Link className="dish-preview" to={`/dish/${dish.id}`}>
            {dish.name}
        </Link>
    )
}