/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useLocation, useParams } from "react-router"
import { loadRestaurant } from "../store/restaurant/restaurant.actions"
import { useSelector } from "react-redux"
import { CircularProgress } from "@mui/material"
import { chefService } from "../services/chef.service"
import clock from '/imgs/clock.svg'
import { NavLink } from "react-router-dom"
import DishList from "../cmps/dish-list"
import { useMediaQuery } from "react-responsive"

export default function RestaurantDetails() {
    const restaurant = useSelector(storeState => storeState.restaurantModule.restaurant)
    const params = useParams()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const restaurantId = params.restaurantId

    useEffect(() => {
        if (!restaurantId) return
        loadRestaurant(restaurantId)
    }, [restaurantId])

    function getFilteredDishes() {
        const basePath = '/restaurant/'

        switch (location.pathname) {
            case `${basePath}${restaurantId}`:
                return restaurant.dishes.filter(dish => dish.type === 'breakfast')
            case `${basePath}${restaurantId}/lunch`:
                return restaurant.dishes.filter(dish => dish.type === 'lunch')
            case `${basePath}${restaurantId}/dinner`:
                return restaurant.dishes.filter(dish => dish.type === 'dinner')
            default:
                return restaurant.dishes
        }
    }

    function getChefName(chefId) {
        return chefService.getChefById(chefId)?.name
    }

    if (!restaurant) return (<CircularProgress className="loader" color="secondary" />)
    return (
        <section className="restaurant-details main-layout">
            <img className={`restaurant-img ${isMobile ? 'full' : ''}`} src={restaurant.imgUrl} alt="" />
            <h1 className="title">{restaurant.name}</h1>
            <h3 className="chef">{getChefName(restaurant.chefId)}</h3>
            <p className="is-open"><img src={clock} alt="" /> {restaurant.isOpenNow ? 'Open now' : 'Closed'}</p>
            <div className="dish-type-links">
                <NavLink to={`/restaurant/${restaurant.id}`} end>Breakfast</NavLink>
                <NavLink to={`/restaurant/${restaurant.id}/lunch`}>Lunch</NavLink>
                <NavLink to={`/restaurant/${restaurant.id}/dinner`}>Dinner</NavLink>
            </div>
            <DishList dishes={getFilteredDishes()} isOpenNow={restaurant.isOpenNow} restaurant={restaurant} />
        </section>
    )
}