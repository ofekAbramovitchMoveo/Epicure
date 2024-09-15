import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import DishList from "../components/dish/dish-list"
import { chefService } from "../services/chef.service"
import { loadRestaurant } from "../store/restaurant/restaurant.actions"

import clock from '/imgs/clock.svg'
import { restaurantService } from "../services/restaurant.service"
import RestaurantDetailsSkeleton from "../components/skeletons/restaurant-details-skeleton"
import { RootState } from "../store/store"
import { Dish } from "../types/dish.type"
import { loadChef } from "../store/chef/chef.actions"
import { OpeningHours } from "../types/restaurant.type"

export default function RestaurantDetails() {
    const restaurant = useSelector((storeState: RootState) => storeState.restaurantModule.restaurant)
    const chef = useSelector((storeState: RootState) => storeState.chefModule.chef)
    const [dishes, setDishes] = useState<Dish[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isOpenNow, setIsOpenNow] = useState(false)
    const params = useParams()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const restaurantId = params.restaurantId

    useEffect(() => {
        async function fetchRestaurant() {
            if (!restaurantId) return
            try {
                await loadRestaurant(restaurantId)
            } catch (err) {
                console.log('err', err)
            }
        }
        fetchRestaurant()
    }, [restaurantId])

    useEffect(() => {
        async function fetchDishes() {
            if (!restaurantId) return
            try {
                const dishes = await restaurantService.getDishes(restaurantId)
                setDishes(dishes)
            } catch (err) {
                console.log('err', err)
            }
        }
        fetchDishes()
    }, [location.pathname])

    useEffect(() => {
        async function fetchChef() {
            if (!restaurant?.chef) return
            try {
                await loadChef(restaurant.chef)
            } catch (err) {
                console.log('err', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchChef()
    }, [restaurant?.chef])

    useEffect(() => {
        if (!restaurant?.openingHours) return
        setIsOpenNow(checkIsOpenNow(restaurant.openingHours))
    }, [restaurant?.openingHours])

    function getFilteredDishes() {
        const basePath = `/restaurant/${restaurantId}`

        switch (location.pathname) {
            case basePath:
                return dishes.filter(dish => dish.type === 'breakfast')
            case `${basePath}/lunch`:
                return dishes.filter(dish => dish.type === 'lunch')
            case `${basePath}/dinner`:
                return dishes.filter(dish => dish.type === 'dinner')
            default:
                return dishes
        }
    }

    function checkIsOpenNow(openingHours: OpeningHours[]): boolean {
        const now = new Date()
        const currDay = now.getDay()
        const currTime = now.getHours() * 60 + now.getMinutes()

        const todayHours = openingHours.find(day => day.day === currDay)
        if (!todayHours) return false

        const { open, close } = todayHours
        if (close < open) {
            return currTime >= open || currTime < close
        }

        return currTime >= open && currTime < close
    }

    return (
        <section className="restaurant-details main-layout">
            {isLoading ? <RestaurantDetailsSkeleton /> : (
                <>
                    <img className={`restaurant-img ${isMobile ? 'full' : ''}`} src={restaurant?.imgUrl} alt="" />
                    <h1 className="title">{restaurant?.name}</h1>
                    <h3 className="chef">{chef?.name}</h3>
                    <p className="is-open"><img src={clock} alt="" /> {isOpenNow ? 'Open now' : 'Closed'}</p>
                    <div className="dish-type-links">
                        <NavLink to={`/restaurant/${restaurant?._id}`} end>Breakfast</NavLink>
                        <NavLink to={`/restaurant/${restaurant?._id}/lunch`}>Lunch</NavLink>
                        <NavLink to={`/restaurant/${restaurant?._id}/dinner`}>Dinner</NavLink>
                    </div>
                    <DishList dishes={getFilteredDishes()} isOpenNow={isOpenNow} restaurant={restaurant} />
                </>
            )}
        </section>
    )
}