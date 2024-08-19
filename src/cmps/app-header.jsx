/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom"
import logo from '/imgs/logo.svg'
import search from '/imgs/search-icon.svg'
import bag from '/imgs/bag.svg'
import user from '/imgs/user-icon.svg'
import { useState } from "react"
import { Box, Fade, Modal } from "@mui/material"
import bagModal from '/imgs/bag-modal.svg'
import menu from '/imgs/menu.svg'
import AppFooter from "./app-footer"
import CloseIcon from '@mui/icons-material/Close'
import SearchSuggestions from "./search-suggestions"
import { useMediaQuery } from "react-responsive"

export default function AppHeader({ suggestions, searchInput, setSearchInput }) {
    const [isBagOpen, setIsBagOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const toggleBag = () => setIsBagOpen(!isBagOpen)
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
                        <NavLink to='/restaurant'>Restaurants</NavLink>
                        <NavLink to='/chef'>Chefs</NavLink>
                    </div>
                    <div className="actions">
                        <button onClick={toggleSearch} className="search-icon"><img src={search} alt="" /></button>
                        <button><img src={user} alt="" /></button>
                        <button onClick={toggleBag}><img src={bag} alt="" /></button>
                    </div>
                </nav>
                {isSearchOpen && (
                    <>
                        <input type="text"
                            placeholder="Search for restaurant cuisine, chef"
                            value={searchInput}
                            onChange={({ target }) => setSearchInput(target.value)} />
                        <SearchSuggestions suggestions={suggestions} />
                    </>
                )}
            </div>
            <Modal open={isBagOpen}
                onClose={toggleBag}
                aria-labelledby="shopping-bag-modal"
                aria-describedby="shopping-bag-description"
                hideBackdrop={true}
                disableScrollLock
                disableEnforceFocus
                disableAutoFocus
                sx={{ bottom: 'auto' }}>
                <Box className="bag-modal" sx={{ position: 'absolute', right: '0' }}>
                    <div className="empty-bag">
                        <img src={bagModal} alt="" />
                        <h4>YOUR BAG IS <br /> EMPTY</h4>
                    </div>
                    <Link className="order-btn" to='/order-history'>ORDER HISTORY</Link>
                </Box>
            </Modal>
            <Modal open={isMenuOpen}
                onClose={toggleMenu}
                aria-labelledby="menu-modal"
                aria-describedby="menu-description"
                disableScrollLock
                disableEnforceFocus
                disableAutoFocus
                sx={{ bottom: 'auto', top: '0' }}
                closeAfterTransition
                slots={{ BackdropComponent: Fade }}>
                <Fade in={isMenuOpen}>
                    <Box className="menu-modal main-layout" sx={{ position: 'relative' }}>
                        <CloseIcon onClick={toggleMenu} className="close-icon" />
                        <nav className="menu-nav-links">
                            <NavLink to='/restaurant' onClick={toggleMenu}>Restaurants</NavLink>
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
                    sx={{ bottom: 'auto', top: '0' }}
                    closeAfterTransition
                    slots={{ BackdropComponent: Fade }}>
                    <Fade in={isSearchOpen}>
                        <Box className="search-modal main-layout" sx={{ position: 'relative' }}>
                            <div className="container">
                                <div className="heading">
                                    <CloseIcon onClick={toggleSearch} className="close-icon" />
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