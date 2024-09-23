import { NavLink } from "react-router-dom"

interface NavLinksProps {
    onClick?: () => void
}

export default function NavLinks({ onClick }: NavLinksProps) {
    return (
        <>
            <NavLink to='/restaurants' onClick={onClick}>Restaurants</NavLink>
            <NavLink to='/chefs' onClick={onClick}>Chefs</NavLink>
        </>
    )
}