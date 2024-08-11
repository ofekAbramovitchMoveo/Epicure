import { Link, NavLink } from "react-router-dom"
import logo from '../assets/imgs/logo.png'
import search from '../assets/imgs/search-icon.png'
import bag from '../assets/imgs/bag-icon.png'
import user from '../assets/imgs/user-icon.png'
import { useState } from "react"
import { Box, Fade, Modal } from "@mui/material"
import bagModal from '../assets/imgs/bag-modal.svg'
import menu from '../assets/imgs/menu.png'
import AppFooter from "./app-footer"
import CloseIcon from '@mui/icons-material/Close'

export default function AppHeader() {
    const [isBagOpen, setIsBagOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const toggleBag = () => setIsBagOpen(!isBagOpen)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="app-header main-layout full">
            <div className="app-header-container">
                <img src={menu} alt="" className="menu-icon" onClick={toggleMenu} />
                <Link to='/' className="logo-container">
                    <img src={logo} alt="logo-icon" />
                    <h3>Epicure</h3>
                </Link>
                <nav>
                    <div className="nav-links">
                        <NavLink to='/restaurant'>Restaurants</NavLink>
                        <NavLink to='/chef'>Chefs</NavLink>
                    </div>
                    <div className="actions">
                        <button><img src={search} alt="" /></button>
                        <button><img src={user} alt="" /></button>
                        <button onClick={toggleBag}><img src={bag} alt="" /></button>
                    </div>
                </nav>
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
        </header>
    )
}