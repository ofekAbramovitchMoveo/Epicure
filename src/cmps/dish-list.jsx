/* eslint-disable react/prop-types */
import { useMediaQuery } from "react-responsive"
import DishPreview from "./dish-preview"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

export default function DishList({ restaurants }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <section className="dish-list-container">
            <h2 className="dish-list-title">SIGNATURE DISH OF:</h2>
            <ul className="dish-list">
                {isMobile ? (
                    <Swiper spaceBetween={24} slidesPerView={1.33}>
                        {restaurants.map(restaurant => (
                            restaurant.dishes.filter(dish => dish.isSignature).map(dish => (
                                <SwiperSlide key={dish.id}>
                                    <DishPreview dish={dish} />
                                </SwiperSlide>
                            ))
                        ))}
                    </Swiper>
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