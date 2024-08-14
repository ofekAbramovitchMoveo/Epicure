import { useEffect } from "react"
import hero from '/imgs/hero.png'
import search from '/imgs/search-icon.png'
import RestaurantList from "../cmps/restaurant-list"
import { loadRestaurants } from "../store/restaurant/restaurant.actions"
import { useSelector } from "react-redux"
import { CircularProgress } from "@mui/material"
import DishList from "../cmps/dish-list"
import spicy from '/imgs/spicy-large.png'
import vegan from '/imgs/vegan-large.png'
import vegitarian from '/imgs/vegitarian.png'
import { loadChefs } from "../store/chef/chef.actions"
import logo from '/imgs/about-logo.svg'
import googlePlayLogo from '/imgs/google-play.svg'
import { useMediaQuery } from "react-responsive"

export default function HomePage() {
    const restaurants = useSelector(storeState => storeState.restaurantModule.restaurants)
    const chefs = useSelector(storeState => storeState.chefModule.chefs)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        loadRestaurants()
        loadChefs()
    }, [])

    function getChefOfTheWeek() {
        if (!chefs || !chefs.length) return
        return chefs.find(chef => chef.isChefOfTheWeek)
    }

    function getChefOfTheWeekRestaurants() {
        if (!restaurants || !restaurants.length) return
        return restaurants.filter(restaurant => restaurant.chefId === getChefOfTheWeek().id)
    }

    function getRandomTopRatedRestaurants() {
        if (!restaurants || !restaurants.length) return []
        return [...restaurants]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
    }

    if (!restaurants || !restaurants.length) return (<CircularProgress className="loader" color="secondary" />)
    return (
        <section className="home-page main-layout">
            <div className="hero-container full main-layout">
                <img className="hero-img full" src={hero} alt="" />
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
                <RestaurantList restaurants={getRandomTopRatedRestaurants()} isChefRestaurants={false} />
                <DishList restaurants={getRandomTopRatedRestaurants()} />
                <div className="icon-meaning full">
                    <h1>THE MEANING OF OUR ICONS:</h1>
                    <ul className="icon-list">
                        <li>
                            <img src={spicy} alt="" />
                            <p>Spicy</p>
                        </li>
                        <li>
                            <img src={vegitarian} alt="" />
                            <p>Vegitarian</p>
                        </li>
                        <li>
                            <img src={vegan} alt="" />
                            <p>Vegan</p>
                        </li>
                    </ul>
                </div>
                <article className="chef-container">
                    <h1>CHEF OF THE WEEK:</h1>
                    <div className="chef-info">
                        <div className="chef-card">
                            <img src={getChefOfTheWeek().imgUrl} alt="" />
                            <div className="name-overlay">
                                <h4>{getChefOfTheWeek().name}</h4>
                            </div>
                        </div>
                        <p>Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit{`'`}s creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.</p>
                    </div>
                    <RestaurantList restaurants={getChefOfTheWeekRestaurants()} isChefRestaurants={true} chefId={getChefOfTheWeek().id} />
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
                                    <span className="logo"></span>
                                    <p>Download on the <br /> <span>App Store</span></p>
                                </button>
                                <button className="google-store-btn">
                                    <img src={googlePlayLogo} alt="" className="logo" />
                                    <p>Get it on <br /> <span>Google Play</span></p>
                                </button>
                            </div>
                        </div>
                        <img src={logo} alt="" className="about-logo" />
                    </div>
                </div>
            </div>
        </section>
    )
}