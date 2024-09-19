import { Suggestion } from "../../types/restaurant.type"
import Image from "../image"
import SearchSuggestions from "../search-suggestions"
import HeaderModal from "./header-modal"


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
                    <Image src="close.svg" alt="" onClick={toggleSearch} className="close-icon" />
                    <h1 className="title">Search</h1>
                </div>
                <div className="input-container">
                    <Image src="search-icon.svg" alt="" />
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