import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import BagModal from "../../modals/bag-modal"
import MenuModal from "../../modals/menu-modal"
import SearchModal from "../../modals/search-modal"
import { LogoutModal } from "../../sign-in/logout-modal"
import SignInModal from "../../sign-in/sign-in-modal"
import { RootState } from "../../../store/store"
import { BagDish } from "../../../types/dish.type"
import { Suggestion } from "../../../types/restaurant.type"
import { User } from "../../../types/user.type"

interface HeaderModalsProps {
    buttonPosition: {
        left: number
    }
    bag: BagDish[]
    isMenuOpen: boolean
    isSearchOpen: boolean
    isLogoutModalOpen: boolean
    isCheckoutPage: boolean
    toggleMenu: () => void
    toggleSearch: () => void
    toggleSignInModal: () => void
    toggleLogoutModal: () => void
    searchInput: string
    setSearchInput: (value: string) => void
    suggestions: Suggestion[]
    loggedInUser: User
    isLoadingSuggestions: boolean
}

export default function HeaderModals({ buttonPosition, bag, isMenuOpen, isSearchOpen,
    isLogoutModalOpen, isCheckoutPage, toggleMenu, toggleSearch, toggleSignInModal,
    toggleLogoutModal, searchInput, setSearchInput, suggestions, loggedInUser, isLoadingSuggestions }: HeaderModalsProps) {
    const isSignInModalOpen = useSelector((storeState: RootState) => storeState.userModule.isSignInModalOpen)
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const isHeader = useSelector((storeState: RootState) => storeState.userModule.isHeader)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <>
            <BagModal bag={bag} isBagOpen={isBagOpen} isMobile={isMobile} />
            <MenuModal isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            {isMobile && (
                <SearchModal isSearchOpen={isSearchOpen} toggleSearch={toggleSearch}
                    searchInput={searchInput} setSearchInput={setSearchInput} suggestions={suggestions} isLoadingSuggestions={isLoadingSuggestions} />
            )}
            {isSignInModalOpen && !loggedInUser ? (
                <SignInModal isOpen={isSignInModalOpen} toggleModal={toggleSignInModal} isHeader={isHeader} />
            ) : (
                <LogoutModal isOpen={isLogoutModalOpen && !isCheckoutPage} toggleModal={toggleLogoutModal}
                    buttonPosition={buttonPosition}
                />
            )}
        </>
    )
}