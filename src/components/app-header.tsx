import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Link, NavLink, useLocation } from "react-router-dom"

import { toggleBag } from "../store/restaurant/restaurant.actions"
import SearchSuggestions from "./search-suggestions"
import BagModal from "./modals/bag-modal"
import MenuModal from "./modals/menu-modal"
import SearchModal from "./modals/search-modal"
import { Suggestion } from "../types/restaurant.type"
import { RootState } from "../store/store"
import SignInModal from "./sign-in/sign-in-modal"
import { toggleSignInModal } from "../store/user/user.actions"
import { SET_HEADER } from "../store/user/user.reducer"
import { LogoutModal } from "./sign-in/logout-modal"

import bag_icon from '/imgs/bag.svg'
import logo from '/imgs/logo.svg'
import menu from '/imgs/menu.svg'
import search from '/imgs/search-icon.svg'
import user from '/imgs/user-icon.svg'

interface AppHeaderProps {
    suggestions: Suggestion[]
    searchInput: string
    setSearchInput: (searchInput: string) => void
}

export default function AppHeader({ suggestions, searchInput, setSearchInput }: AppHeaderProps) {
    const loggedInUser = useSelector((storeState: RootState) => storeState.userModule.user)
    const isSignInModalOpen = useSelector((storeState: RootState) => storeState.userModule.isSignInModalOpen)
    const bag = useSelector((storeState: RootState) => storeState.restaurantModule.bag)
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const isHeader = useSelector((storeState: RootState) => storeState.userModule.isHeader)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [buttonPosition, setButtonPosition] = useState({ left: 0 })
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const dispatch = useDispatch()
    const location = useLocation()
    const userIconRef = useRef<HTMLButtonElement>(null)
    const isCheckoutPage = location.pathname.includes('checkout')

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (userIconRef.current) {
            const rect = userIconRef.current.getBoundingClientRect()
            setButtonPosition({ left: rect.left + rect.width / 2 })
        }
    }, [isLogoutModalOpen, windowWidth])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
        setSearchInput('')
    }

    const toggleLogoutModal = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen)
    }

    const onUserClick = () => {
        dispatch({ type: SET_HEADER, isHeader: true })
        if (!loggedInUser) toggleSignInModal()
        else toggleLogoutModal()
    }

    return (
        <header className="app-header main-layout full">
            <div className="app-header-container">
                <img src={menu} alt="" className="menu-icon" onClick={toggleMenu} />
                <Link to='/' className="logo-container">
                    <img src={logo} alt="logo-icon" />
                    <h3>EPICURE</h3>
                </Link>
                {!isCheckoutPage ? (
                    <nav>
                        <div className="nav-links">
                            <NavLink to='/restaurants'>Restaurants</NavLink>
                            <NavLink to='/chef'>Chefs</NavLink>
                        </div>
                        <div className="actions">
                            <button onClick={toggleSearch} className="search-icon"><img src={search} alt="" /></button>
                            <button onClick={onUserClick} ref={userIconRef}><img src={user} alt="" /></button>
                            <button onClick={toggleBag} className="bag-icon">
                                <img src={bag_icon} alt="" />
                                {bag.length > 0 && (
                                    <span className="bag-count">{bag.length}</span>
                                )}
                            </button>
                        </div>
                    </nav>
                ) : (
                    <h1 className="checkout-title">CHECKOUT</h1>
                )}
                {isSearchOpen && !isCheckoutPage && (
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
            {isSignInModalOpen && !loggedInUser ? (
                <SignInModal isOpen={isSignInModalOpen} toggleModal={toggleSignInModal} isHeader={isHeader} />
            ) : (
                <LogoutModal isOpen={isLogoutModalOpen && !isCheckoutPage} toggleModal={toggleLogoutModal}
                    buttonPosition={buttonPosition}
                />
            )}
        </header>
    )
}