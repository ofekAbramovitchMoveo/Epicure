import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { loadBag } from "../../../store/restaurant/restaurant.actions"
import { Suggestion } from "../../../types/restaurant.type"
import { RootState } from "../../../store/store"
import { toggleSignInModal } from "../../../store/user/user.actions"
import { restaurantService } from "../../../services/restaurant.service"
import Image from "../../image"
import Navbar from "./navbar"
import HeaderInput from "./header-input"
import HeaderModals from "./header-modals"

export default function AppHeader() {
    const loggedInUser = useSelector((storeState: RootState) => storeState.userModule.user)
    const bag = useSelector((storeState: RootState) => storeState.restaurantModule.bag)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [buttonPosition, setButtonPosition] = useState({ left: 0 })
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [searchInput, setSearchInput] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const userIconRef = useRef<HTMLButtonElement>(null)
    const isCheckoutPage = location.pathname.includes('checkout')

    useEffect(() => {
        async function fetchSuggestions() {
            setIsLoadingSuggestions(true)
            const suggestions = await restaurantService.getRestaurantSuggestions(searchInput)
            setSuggestions(suggestions)
            setIsLoadingSuggestions(false)
        }
        fetchSuggestions()
    }, [searchInput])

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

    useEffect(() => {
        loadBag()
    }, [loggedInUser, bag.length])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
        setSearchInput('')
    }

    const toggleLogoutModal = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen)
    }

    return (
        <header className="app-header main-layout full">
            <div className="app-header-container">
                {!isCheckoutPage ? <Image src="menu.svg" alt="menu-icon" className="menu-icon" onClick={toggleMenu} /> : (
                    <Image src="close.svg" alt="close-icon" className="close-icon" onClick={() => navigate(-1)} />
                )}
                <Link to='/' className="logo-container">
                    <Image src="logo.svg" alt="logo-icon" />
                    <h3>EPICURE</h3>
                </Link>
                {!isCheckoutPage ? (
                    <Navbar toggleSearch={toggleSearch} toggleLogoutModal={toggleLogoutModal}
                        userIconRef={userIconRef} bag={bag} loggedInUser={loggedInUser}
                        toggleSignInModal={toggleSignInModal}
                    />
                ) : (
                    <h1 className="checkout-title">CHECKOUT</h1>
                )}
                {isSearchOpen && !isCheckoutPage && (
                    <HeaderInput searchInput={searchInput} setSearchInput={setSearchInput}
                        suggestions={suggestions} toggleSearch={toggleSearch} isLoadingSuggestions={isLoadingSuggestions}
                    />
                )}
            </div>
            <HeaderModals buttonPosition={buttonPosition} bag={bag} isMenuOpen={isMenuOpen}
                isSearchOpen={isSearchOpen} isLogoutModalOpen={isLogoutModalOpen} isCheckoutPage={isCheckoutPage}
                toggleMenu={toggleMenu} toggleSearch={toggleSearch} toggleSignInModal={toggleSignInModal}
                toggleLogoutModal={toggleLogoutModal} searchInput={searchInput} setSearchInput={setSearchInput}
                suggestions={suggestions} loggedInUser={loggedInUser} isLoadingSuggestions={isLoadingSuggestions}
            />
        </header>
    )
}