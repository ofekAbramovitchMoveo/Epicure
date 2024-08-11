/* eslint-disable react/prop-types */
import { useMediaQuery } from "react-responsive"
import DishPreview from "./dish-preview"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function DishList({ restaurants }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <section className="dish-list-container">
            <h2 className="dish-list-title">SIGNATURE DISH OF:</h2>
            <ul className="dish-list">
                {isMobile ? (
                    <Carousel showArrows={true} showThumbs={false} showStatus={false} showIndicators={false}>
                        {restaurants.map(restaurant => (
                            restaurant.dishes.filter(dish => dish.isSignature).map(dish => (
                                <div key={dish.id}>
                                    <DishPreview dish={dish} />
                                </div>
                            ))
                        ))}
                    </Carousel>
                ) : (
                    restaurants.map(restaurant => (
                        restaurant.dishes.filter(dish => dish.isSignature).map(dish => (
                            <li key={dish.id}>
                                <DishPreview dish={dish} />
                            </li>
                        ))
                    ))
                )
                }
            </ul>
        </section>
    )
}