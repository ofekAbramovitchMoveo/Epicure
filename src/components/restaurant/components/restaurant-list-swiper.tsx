import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

import RestaurantPreview from "./restaurant-preview"
import { Restaurant } from "../../../types/restaurant.type"

interface RestaurantListSwiperProps {
    restaurants: Restaurant[]
    isChefRestaurants: boolean
    getChefName: (chefId: string) => string | undefined
}

export default function RestaurantListSwiper({ restaurants, isChefRestaurants, getChefName }: RestaurantListSwiperProps) {
    return (
        <Swiper spaceBetween={24} slidesPerView={1.33}>
            {restaurants.map(restaurant => (
                <SwiperSlide key={restaurant._id}>
                    <RestaurantPreview restaurant={restaurant} chefName={getChefName(restaurant.chefId) || ''} isChefRestaurants={isChefRestaurants || false} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}