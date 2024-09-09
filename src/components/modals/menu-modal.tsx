import { NavLink } from "react-router-dom"

import AppFooter from "../app-footer"
import HeaderModal from "./header-modal"

import close from '/imgs/close.svg'

interface MenuModalProps {
    isMenuOpen: boolean
    toggleMenu: () => void
}

export default function MenuModal({ isMenuOpen, toggleMenu }: MenuModalProps) {
    return (
        <HeaderModal open={isMenuOpen}
            onClose={toggleMenu}
            aria-labelledby="menu-modal"
            aria-describedby="menu-description"
            sx={{ top: '0', zIndex: 10000 }}
            boxClassName="menu-modal main-layout"
            boxSx={{ position: 'relative' }}
        >
            <img src={close} alt="" onClick={toggleMenu} className="close-icon" />
            <nav className="menu-nav-links">
                <NavLink to='/restaurants' onClick={toggleMenu}>Restaurants</NavLink>
                <NavLink to='/chef' onClick={toggleMenu}>Chefs</NavLink>
            </nav>
            <AppFooter />
        </HeaderModal>
    )
}