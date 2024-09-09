import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

import DishPreview from "./dish-preview"
import { Dish } from "../../types/dish.type"

interface HomePageDishListProps {
    getSignatureDishes: () => Promise<Dish[]>
}

export default function HomePageDishList({ getSignatureDishes }: HomePageDishListProps) {
    const [dishes, setDishes] = useState<Dish[]>([])
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        async function fetchDishes() {
            try {
                const signatureDishes = await getSignatureDishes()
                setDishes(signatureDishes)
            } catch (err) {
                console.log('Error fetching signature dishes:', err)
            }
        }
        fetchDishes()
    }, [getSignatureDishes])

    return (
        <section className="home-page-dish-list-container">
            <h2 className="home-page-dish-list-title">SIGNATURE DISH OF:</h2>
            <ul className="home-page-dish-list">
                {isMobile ? (
                    <Swiper spaceBetween={24} slidesPerView={1.33}>
                        {dishes.map(dish => (
                            <SwiperSlide key={dish._id}>
                                <DishPreview dish={dish} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    dishes.map(dish => (
                        <li key={dish._id}>
                            <DishPreview dish={dish} />
                        </li>
                    ))
                )
                }
            </ul>
        </section>
    )
}