import { useCallback, useEffect, useState } from 'react'

import HomePageDishList from '../components/dish/components/home-page-dish-list'
import RestaurantList from "../components/restaurant/components/restaurant-list"
import { loadRestaurants } from '../store/restaurant/restaurant.actions'
import { restaurantService } from '../services/restaurant.service'
import { Suggestion } from '../types/restaurant.type'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { loadChefs } from '../store/chef/chef.actions'
import Loader from '../components/loader'
import Hero from '../components/hero'
import Icons from '../components/icons'
import ChefOfTheWeek from '../components/chef-of-the-week'
import About from '../components/about'

export default function HomePage() {
    const restaurants = useSelector((storeState: RootState) => storeState.restaurantModule.restaurants)
    const chefs = useSelector((storeState: RootState) => storeState.chefModule.chefs)
    const [searchInput, setSearchInput] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

    useEffect(() => {
        async function fetchData() {
            await loadRestaurants()
            await loadChefs()
        }
        fetchData()

        return () => {
            setSearchInput('')
        }
    }, [])

    useEffect(() => {
        async function fetchSuggestions() {
            setIsLoadingSuggestions(true)
            const suggestions = await restaurantService.getRestaurantSuggestions(searchInput)
            setSuggestions(suggestions)
            setIsLoadingSuggestions(false)
        }
        fetchSuggestions()
    }, [searchInput])

    function getTopRatedRestaurants() {
        if (!restaurants || !restaurants.length) return []
        return [...restaurants]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
    }

    const getSignatureDishes = useCallback(async () => {
        const topRestaurants = getTopRatedRestaurants()
        if (!topRestaurants || !topRestaurants.length) return []

        const signatureDishes = await Promise.all(topRestaurants.map(async (restaurant) => {
            const allDishes = await restaurantService.getDishes(restaurant._id)
            return allDishes.filter(dish => dish.isSignature)
        }))

        return signatureDishes.flat()
    }, [restaurants])

    if (!restaurants || !restaurants.length) return (<Loader />)
    return (
        <section className="home-page main-layout">
            <Hero suggestions={suggestions} searchInput={searchInput} setSearchInput={setSearchInput} isLoadingSuggestions={isLoadingSuggestions} />
            <div className="main-content full main-layout">
                <RestaurantList restaurants={getTopRatedRestaurants()} />
                <HomePageDishList getSignatureDishes={getSignatureDishes} />
                <Icons />
                <ChefOfTheWeek chefs={chefs} restaurants={restaurants} />
                <About />
            </div>
        </section>
    )
}