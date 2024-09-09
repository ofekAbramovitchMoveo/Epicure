/* eslint-disable react/prop-types */
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

export default function RestaurantDetails() {
    const restaurant = useSelector(storeState => storeState.restaurantModule.restaurant)
    const isLoading = useSelector(storeState => storeState.restaurantModule.isLoading)
    const [dishes, setDishes] = useState([])
    const [chef, setChef] = useState(null)
    const [isChefLoading, setIsChefLoading] = useState(true)
    const params = useParams()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const restaurantId = params.restaurantId

    useEffect(() => {
        async function fetchData() {
            if (!restaurantId) return
            loadRestaurant(restaurantId)
            const dishes = await restaurantService.getDishes(restaurantId)
            setDishes(dishes)
        }
        fetchData()
    }, [restaurantId, location.pathname])

    useEffect(() => {
        if (!restaurant?.chef) return
        async function fetchChef() {
            setIsChefLoading(true)
            try {
                const chef = await chefService.getChefById(restaurant.chef)
                setChef(chef)
            } catch (err) {
                console.log('err', err)
            } finally {
                setIsChefLoading(false)
            }
        }
        fetchChef()
    }, [restaurant?.chef])

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

    return (
        <section className="restaurant-details main-layout">
            {isLoading || isChefLoading ? <RestaurantDetailsSkeleton /> : (
                <>
                    <img className={`restaurant-img ${isMobile ? 'full' : ''}`} src={restaurant?.imgUrl} alt="" />
                    <h1 className="title">{restaurant?.name}</h1>
                    <h3 className="chef">{chef?.name}</h3>
                    <p className="is-open"><img src={clock} alt="" /> {restaurant?.isOpenNow ? 'Open now' : 'Closed'}</p>
                    <div className="dish-type-links">
                        <NavLink to={`/restaurant/${restaurant?._id}`} end>Breakfast</NavLink>
                        <NavLink to={`/restaurant/${restaurant?._id}/lunch`}>Lunch</NavLink>
                        <NavLink to={`/restaurant/${restaurant?._id}/dinner`}>Dinner</NavLink>
                    </div>
                    <DishList dishes={getFilteredDishes()} isOpenNow={restaurant.isOpenNow} restaurant={restaurant} />
                </>
            )}
        </section>
    )
}