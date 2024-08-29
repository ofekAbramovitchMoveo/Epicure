/* eslint-disable react/prop-types */
import { useState } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { Link, NavLink } from "react-router-dom"
import { Box, Fade, Modal } from "@mui/material"

import { toggleBag } from "../store/restaurant/restaurant.actions"
import AppFooter from "./app-footer"
import SearchSuggestions from "./search-suggestions"
import ShoppingBag from "./shopping-bag"

import bag_icon from '/imgs/bag.svg'
import close from '/imgs/close.svg'
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
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

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
            <Modal open={isBagOpen}
                onClose={toggleBag}
                aria-labelledby="shopping-bag-modal"
                aria-describedby="shopping-bag-description"
                disableScrollLock
                disableEnforceFocus
                disableAutoFocus
                sx={{ bottom: 'auto' }}
                closeAfterTransition
                slots={{ BackdropComponent: Fade }}
                slotProps={{
                    backdrop: {
                        timeout: {
                            enter: 300,
                            exit: 0
                        },
                        easing: {
                            enter: 'ease-out',
                            exit: 'ease-out'
                        }
                    }
                }}
            >
                <Fade in={isBagOpen}>
                    <Box className={`bag-modal ${isMobile ? 'main-layout' : ''}`} sx={{
                        padding: isMobile && bag.length ? '16px 0 24px' : (bag.length ? '27px 0 37px' : ''),
                        justifyContent: bag.length ? 'inherit' : 'center',
                        position: 'absolute',
                        right: '0',
                        height: isMobile ? (bag.length ? '514px' : '218px') : (!bag || !bag.length ? '586px' : '779px')
                    }}>
                        <ShoppingBag bag={bag} toggleBag={toggleBag} />
                    </Box>
                </Fade>
            </Modal>
            <Modal open={isMenuOpen}
                onClose={toggleMenu}
                aria-labelledby="menu-modal"
                aria-describedby="menu-description"
                disableScrollLock
                disableEnforceFocus
                disableAutoFocus
                sx={{ bottom: 'auto', top: '0', zIndex: 10000 }}
                closeAfterTransition
                slots={{ BackdropComponent: Fade }}
                slotProps={{
                    backdrop: {
                        timeout: {
                            enter: 300,
                            exit: 0
                        },
                        easing: {
                            enter: 'ease-out',
                            exit: 'ease-out'
                        }
                    }
                }}
            >
                <Fade in={isMenuOpen}>
                    <Box className="menu-modal main-layout" sx={{ position: 'relative' }}>
                        <img src={close} alt="" onClick={toggleMenu} className="close-icon" />
                        <nav className="menu-nav-links">
                            <NavLink to='/restaurants' onClick={toggleMenu}>Restaurants</NavLink>
                            <NavLink to='/chef' onClick={toggleMenu}>Chefs</NavLink>
                        </nav>
                        <AppFooter />
                    </Box>
                </Fade>
            </Modal>
            {isMobile && (
                <Modal open={isSearchOpen}
                    onClose={toggleSearch}
                    aria-labelledby="search-modal"
                    aria-describedby="search-description"
                    disableScrollLock
                    disableEnforceFocus
                    disableAutoFocus
                    sx={{ bottom: 'auto', top: '0', zIndex: 10000 }}
                    closeAfterTransition
                    slots={{ BackdropComponent: Fade }}>
                    <Fade in={isSearchOpen}>
                        <Box className="search-modal main-layout" sx={{ position: 'relative' }}>
                            <div className="container">
                                <div className="heading">
                                    <img src={close} alt="" onClick={toggleSearch} className="close-icon" />
                                    <h1 className="title">Search</h1>
                                </div>
                                <div className="input-container">
                                    <img src={search} alt="" />
                                    <input type="text"
                                        placeholder="Search for restaurant cuisine, chef"
                                        value={searchInput}
                                        onChange={({ target }) => setSearchInput(target.value)} />
                                </div>
                                <SearchSuggestions suggestions={suggestions} toggleSearch={toggleSearch} />
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            )}
        </header>
    )
}