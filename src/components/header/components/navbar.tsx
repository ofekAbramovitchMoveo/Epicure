import { useDispatch } from "react-redux"

import Image from "../../image"
import NavLinks from "./nav-links"
import { SET_HEADER } from "../../../store/user/user.reducer"
import { toggleBag } from "../../../store/restaurant/restaurant.actions"
import { BagDish } from "../../../types/dish.type"
import { User } from "../../../types/user.type"

interface NavbarProps {
    toggleSearch: () => void
    toggleLogoutModal: () => void
    userIconRef: React.RefObject<HTMLButtonElement>
    bag: BagDish[]
    loggedInUser: User
    toggleSignInModal: () => void
}

export default function Navbar({ toggleSearch, toggleLogoutModal, userIconRef, bag,
    loggedInUser, toggleSignInModal }: NavbarProps) {
    const dispatch = useDispatch()

    const onUserClick = () => {
        dispatch({ type: SET_HEADER, isHeader: true })
        if (!loggedInUser) toggleSignInModal()
        else toggleLogoutModal()
    }

    return (
        <nav>
            <div className="nav-links">
                <NavLinks />
            </div>
            <div className="actions">
                <button onClick={toggleSearch} className="search-icon"><Image src="search-icon.svg" alt="search-icon" /></button>
                <button onClick={onUserClick} ref={userIconRef}><Image src="user-icon.svg" alt="user-icon" /></button>
                <button onClick={toggleBag} className="bag-icon">
                    <Image src="bag.svg" alt="bag-icon" />
                    {bag.length > 0 && (
                        <span className="bag-count">{bag.length}</span>
                    )}
                </button>
            </div>
        </nav>
    )
}