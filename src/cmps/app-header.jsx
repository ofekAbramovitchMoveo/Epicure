import { Link, NavLink } from "react-router-dom"
import logo from '../assets/imgs/logo.png'
import search from '../assets/imgs/search-icon.png'
import bag from '../assets/imgs/bag-icon.png'
import user from '../assets/imgs/user-icon.png'
import { useState } from "react"
import { Box, Modal } from "@mui/material"
import bagModal from '../assets/imgs/bag-modal.svg'

export default function AppHeader() {
    const [isBagOpen, setIsBagOpen] = useState(false)

    const toggleBag = () => setIsBagOpen(!isBagOpen)

    return (
        <header className="app-header main-layout full">
            <div className="app-header-container">
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
                sx={{ bottom: 'auto', left: 'auto' }}>
                <Box className="bag-modal" sx={{ position: 'absolute', top: '64px', right: '0' }}>
                    <div className="empty-bag">
                        <img src={bagModal} alt="" />
                        <h4>YOUR BAG IS <br /> EMPTY</h4>
                    </div>
                    <Link className="order-btn" to='/order-history'>ORDER HISTORY</Link>
                </Box>
            </Modal>
        </header>
    )
}