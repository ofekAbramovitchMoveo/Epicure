import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import DishList from "../../dish/components/dish-list"
import { loadRestaurant } from "../../../store/restaurant/restaurant.actions"
import { restaurantService } from "../../../services/restaurant.service"
import RestaurantDetailsSkeleton from "../../skeletons/restaurant-details-skeleton"
import { RootState } from "../../../store/store"
import { Dish } from "../../../types/dish.type"
import { loadChef } from "../../../store/chef/chef.actions"
import { OpeningHours } from "../../../types/restaurant.type"
import Image from "../../image"
import { chefService } from "../../../services/chef.service"

export default function RestaurantDetails() {
    const restaurant = useSelector((storeState: RootState) => storeState.restaurantModule.restaurant)
    const chef = useSelector((storeState: RootState) => storeState.chefModule.chef)
    const [dishes, setDishes] = useState<Dish[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isOpenNow, setIsOpenNow] = useState(false)
    const [hasIncrementedView, setHasIncrementedView] = useState(false)
    const params = useParams()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const restaurantId = params.restaurantId

    useEffect(() => {
        async function fetchRestaurant() {
            if (!restaurantId) return
            setHasIncrementedView(false)
            try {
                const loadedRestaurant = await loadRestaurant(restaurantId)
                if (loadedRestaurant?.chefId && !hasIncrementedView) {
                    await chefService.incrementViewCount(loadedRestaurant.chefId)
                    setHasIncrementedView(true)
                }
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
            if (!restaurant?.chefId) return
            try {
                await loadChef(restaurant.chefId)
            } catch (err) {
                console.log('err', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchChef()
    }, [restaurant?.chefId])

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
        // const currDay = 1
        // const currTime = 10

        const todayHours = openingHours.find(day => day.day === currDay)
        if (todayHours) {
            const { open, close } = todayHours
            if (close < open) {
                if (currTime >= open || currTime < close) return true
            } else {
                if (currTime >= open && currTime < close) return true
            }
        }

        const prevDay = (currDay - 1 + 7) % 7
        const prevDayHours = openingHours.find(day => day.day === prevDay)
        if (prevDayHours) {
            const { open, close } = prevDayHours
            if (close < open && currTime < close) return true
        }

        return false
    }

    return (
        <section className="restaurant-details main-layout">
            {isLoading ? <RestaurantDetailsSkeleton /> : (
                <>
                    <Image className={`restaurant-img ${isMobile ? 'full' : ''}`} src={restaurant?.imgUrl || ""} alt="" />
                    <h1 className="title">{restaurant?.name}</h1>
                    <h3 className="chef">{chef?.name}</h3>
                    <p className="is-open"><Image src="clock.svg" alt="" /> {isOpenNow ? 'Open now' : 'Closed'}</p>
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