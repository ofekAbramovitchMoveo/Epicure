/* eslint-disable react/prop-types */
import hero from '../assets/imgs/hero.png'
import search from '../assets/imgs/search-icon.svg'
import RestaurantList from "../cmps/restaurant-list"
import { CircularProgress } from "@mui/material"
import DishList from "../cmps/dish-list"
import spicy from '../assets/imgs/spicy-large.svg'
import vegan from '../assets/imgs/vegan-large.svg'
import vegitarian from '../assets/imgs/vegitarian-large.svg'
import logo from '../assets/imgs/about-logo.svg'
import googlePlayLogo from '../assets/imgs/google-play.svg'
import AppFooter from "../cmps/app-footer"
import { useMediaQuery } from "react-responsive"
import SearchSuggestions from "../cmps/search-suggestions"

export default function HomePage({ suggestions, searchInput, setSearchInput, restaurants, chefs }) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    function getChefOfTheWeek() {
        if (!chefs || !chefs.length) return
        return chefs.find(chef => chef.isChefOfTheWeek)
    }

    function getChefOfTheWeekRestaurants() {
        if (!restaurants || !restaurants.length) return
        return restaurants.filter(restaurant => restaurant.chefId === getChefOfTheWeek().id)
    }

    function getTopRatedRestaurants() {
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
                        <input type="text" placeholder="Search for restaurant cuisine, chef"
                            value={searchInput} onChange={({ target }) => setSearchInput(target.value)} />
                        <SearchSuggestions suggestions={suggestions} />
                    </div>
                </div>
            </div>
            <div className="main-content full main-layout">
                <RestaurantList restaurants={getTopRatedRestaurants()} isChefRestaurants={false} />
                <DishList restaurants={getTopRatedRestaurants()} />
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
                <AppFooter />
            </div>
        </section>
    )
}