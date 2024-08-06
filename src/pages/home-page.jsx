import { useEffect } from "react"
import hero from '../assets/imgs/hero.png'
import search from '../assets/imgs/search-icon.png'
import RestaurantList from "../cmps/restaurant-list"
import { loadRestaurants } from "../store/restaurant/restaurant.actions"
import { useSelector } from "react-redux"
import { CircularProgress } from "@mui/material"
import { loadDishes } from "../store/dish/dish.action"
import DishList from "../cmps/dish-list"

export default function HomePage() {
    const restaurants = useSelector(storeState => storeState.restaurantModule.restaurants)
    const dishes = useSelector(storeState => storeState.dishModule.dishes)

    useEffect(() => {
        loadRestaurants()
        loadDishes()
    }, [])


    if (!restaurants || !restaurants.length) return (<CircularProgress className="loader" color="secondary" />)
    return (
        <section className="home-page main-layout">
            <div className="hero-container full">
                <img className="hero-img" src={hero} alt="" />
                <div className="hero-box">
                    <p className="hero-text">
                        Epicure works with the top <br />
                        chef restaurants in Tel Aviv
                    </p>
                    <div className="input-container">
                        <img src={search} alt="" className="search-icon" />
                        <input type="text" placeholder="Search for restaurant cuisine, chef" />
                    </div>
                </div>
            </div>
            <div className="main-content full main-layout">
                <RestaurantList restaurants={restaurants} />
                <DishList dishes={dishes} />
            </div>
        </section>
    )
}