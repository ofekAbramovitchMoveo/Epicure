import { Suggestion } from "../../types/restaurant.type"
import SearchSuggestions from "../search-suggestions"
import HeaderModal from "./header-modal"

import close from '/imgs/close.svg'
import search from '/imgs/search-icon.svg'

interface SearchModalProps {
    isSearchOpen: boolean
    toggleSearch: () => void
    searchInput: string
    setSearchInput: (value: string) => void
    suggestions: Suggestion[]
}

export default function SearchModal({ isSearchOpen, toggleSearch, searchInput, setSearchInput, suggestions }: SearchModalProps) {
    return (
        <HeaderModal open={isSearchOpen}
            onClose={toggleSearch}
            aria-labelledby="search-modal"
            aria-describedby="search-description"
            sx={{ top: '0', zIndex: 10000 }}
            boxClassName="search-modal main-layout"
            boxSx={{ position: 'relative' }}
        >
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
        </HeaderModal>
    )
}