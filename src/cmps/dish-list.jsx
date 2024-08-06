/* eslint-disable react/prop-types */

import DishPreview from "./dish-preview";


export default function DishList({ dishes }) {


    return (
        <section className="dish-list-container">
            <h2 className="dish-list-title">SIGNATURE DISH OF:</h2>
            <ul className="dish-list">
                {dishes.map(dish => (
                    <li key={dish.id}>
                        <DishPreview dish={dish} />
                    </li>
                ))}
            </ul>
        </section>
    )
}