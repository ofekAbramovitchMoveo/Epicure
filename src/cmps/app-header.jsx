import { Link, NavLink } from "react-router-dom"
import logo from '../assets/imgs/logo.png'
import search from '../assets/imgs/search-icon.png'
import bag from '../assets/imgs/bag-icon.png'
import user from '../assets/imgs/user-icon.png'

export default function AppHeader() {

    return (
        <header className="app-header main-layout">
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
                    <NavLink to='/'><img src={search} alt="" /></NavLink>
                    <NavLink to='/'><img src={user} alt="" /></NavLink>
                    <NavLink to='/'><img src={bag} alt="" /></NavLink>
                </div>
            </nav>
        </header>
    )
}