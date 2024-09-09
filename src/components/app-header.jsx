/* eslint-disable react/prop-types */
import { useState } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Link, NavLink } from "react-router-dom"

import { toggleBag } from "../store/restaurant/restaurant.actions"
import SearchSuggestions from "./search-suggestions"
import BagModal from "./modals/bag-modal"
import MenuModal from "./modals/menu-modal"
import SearchModal from "./modals/search-modal"

import bag_icon from '/imgs/bag.svg'
import logo from '/imgs/logo.svg'
import menu from '/imgs/menu.svg'
import search from '/imgs/search-icon.svg'
import user from '/imgs/user-icon.svg'

export default function AppHeader({ suggestions, searchInput, setSearchInput }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const bag = useSelector(storeState => storeState.restaurantModule.bag)
    const isBagOpen = useSelector(storeState => storeState.restaurantModule.isBagOpen)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
        setSearchInput('')
    }

    return (
        <header className="app-header main-layout full">
            <div className="app-header-container">
                <img src={menu} alt="" className="menu-icon" onClick={toggleMenu} />
                <Link to='/' className="logo-container">
                    <img src={logo} alt="logo-icon" />
                    <h3>EPICURE</h3>
                </Link>
                <nav>
                    <div className="nav-links">
                        <NavLink to='/restaurants'>Restaurants</NavLink>
                        <NavLink to='/chef'>Chefs</NavLink>
                    </div>
                    <div className="actions">
                        <button onClick={toggleSearch} className="search-icon"><img src={search} alt="" /></button>
                        <button><img src={user} alt="" /></button>
                        <button onClick={toggleBag} className="bag-icon">
                            <img src={bag_icon} alt="" />
                            {bag.length > 0 && (
                                <span className="bag-count">{bag.length}</span>
                            )}
                        </button>
                    </div>
                </nav>
                {isSearchOpen && (
                    <>
                        <input type="text"
                            placeholder="Search for restaurant cuisine, chef"
                            value={searchInput}
                            onChange={({ target }) => setSearchInput(target.value)} />
                        <SearchSuggestions suggestions={suggestions} toggleSearch={toggleSearch} />
                    </>
                )}
            </div>
            <BagModal bag={bag} toggleBag={toggleBag} isBagOpen={isBagOpen} isMobile={isMobile} />
            <MenuModal isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            {isMobile && (
                <SearchModal isSearchOpen={isSearchOpen} toggleSearch={toggleSearch}
                    searchInput={searchInput} setSearchInput={setSearchInput} suggestions={suggestions} />
            )}
        </header>
    )
}