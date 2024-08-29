/* eslint-disable react/prop-types */
import { useMediaQuery } from "react-responsive"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

import DishPreview from "./dish-preview"

export default function HomePageDishList({ restaurants }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <section className="home-page-dish-list-container">
            <h2 className="home-page-dish-list-title">SIGNATURE DISH OF:</h2>
            <ul className="home-page-dish-list">
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