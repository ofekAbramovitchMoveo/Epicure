import { useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from "react-responsive"
import { CircularProgress } from "@mui/material"

import HomePageDishList from '../components/dish/home-page-dish-list'
import RestaurantList from "../components/restaurant/restaurant-list"
import SearchSuggestions from "../components/search-suggestions"
import { loadRestaurants } from '../store/restaurant/restaurant.actions'
import { restaurantService } from '../services/restaurant.service'
import { Suggestion } from '../types/restaurant.type'
import Image from '../components/image'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { loadChefs } from '../store/chef/chef.actions'

export default function HomePage() {
    const restaurants = useSelector((storeState: RootState) => storeState.restaurantModule.restaurants)
    const chefs = useSelector((storeState: RootState) => storeState.chefModule.chefs)
    const [searchInput, setSearchInput] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

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
            const suggestions = await restaurantService.getRestaurantSuggestions(searchInput)
            setSuggestions(suggestions)
        }
        fetchSuggestions()
    }, [searchInput])

    function getChefOfTheWeek() {
        if (!chefs || !chefs.length) return
        return chefs.find(chef => chef.isChefOfTheWeek)
    }

    function getChefOfTheWeekRestaurants() {
        if (!restaurants || !restaurants.length) return []
        return restaurants.filter(restaurant => restaurant.chefId === getChefOfTheWeek()?._id)
    }

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

    if (!restaurants || !restaurants.length) return (<CircularProgress className="loader" color="secondary" />)
    return (
        <section className="home-page main-layout">
            <div className="hero-container full main-layout">
                <Image className="hero-img full" src="hero.png" alt="" />
                <div className="hero-box">
                    <p className="hero-text">
                        Epicure works with the top <br />
                        chef restaurants in Tel Aviv
                    </p>
                    <div className="input-container">
                        <Image src="search-icon.svg" alt="" className="search-icon" />
                        <input type="text" placeholder="Search for restaurants, cuisine, chef"
                            value={searchInput} onChange={({ target }) => setSearchInput(target.value)} />
                        <SearchSuggestions suggestions={suggestions} />
                    </div>
                </div>
            </div>
            <div className="main-content full main-layout">
                <RestaurantList restaurants={getTopRatedRestaurants()} />
                <HomePageDishList getSignatureDishes={getSignatureDishes} />
                <div className="icon-meaning full">
                    <h1>THE MEANING OF OUR ICONS:</h1>
                    <ul className="icon-list">
                        <li>
                            <Image src="spicy.svg" alt="" />
                            <p>Spicy</p>
                        </li>
                        <li>
                            <Image src="vegitarian.svg" alt="" />
                            <p>Vegitarian</p>
                        </li>
                        <li>
                            <Image src="vegan.svg" alt="" />
                            <p>Vegan</p>
                        </li>
                    </ul>
                </div>
                <article className="chef-container">
                    <h1>CHEF OF THE WEEK:</h1>
                    <div className="chef-info">
                        <div className="chef-card">
                            <Image src={getChefOfTheWeek()?.imgUrl || ""} alt="" />
                            <div className="name-overlay">
                                <h4>{getChefOfTheWeek()?.name}</h4>
                            </div>
                        </div>
                        <p>Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit{`'`}s creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.</p>
                    </div>
                    <RestaurantList restaurants={getChefOfTheWeekRestaurants()} isChefRestaurants={true} chefId={getChefOfTheWeek()?._id} />
                </article>
                <div className="about full main-layout">
                    <div className="about-container">
                        <div className="text-container">
                            <h1>ABOUT US:</h1>
                            <p className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum non
                                eu ipsum. Cras porta malesuada eros, eget blandit
                                turpis suscipit at.  Vestibulum sed massa in magna sodales porta.  Vivamus elit urna,
                                dignissim a vestibulum.
                                {!isMobile &&
                                    <>
                                        <br />
                                        <br />
                                    </>
                                }
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum no
                                eu ipsum. Cras porta malesuada eros.
                            </p>
                            <div className="btns">
                                <button className="app-store-btn">
                                    <Image src="apple.svg" alt="" className="logo" />
                                    <p>Download on the <br /> <span>App Store</span></p>
                                </button>
                                <button className="google-store-btn">
                                    <Image src="google-play.svg" alt="" className="logo" />
                                    <p>Get it on <br /> <span>Google Play</span></p>
                                </button>
                            </div>
                        </div>
                        <Image src="logo.svg" alt="" className="about-logo" />
                    </div>
                </div>
            </div>
        </section>
    )
}