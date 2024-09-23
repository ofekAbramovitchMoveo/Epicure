import { Suggestion } from "../../../types/restaurant.type"
import SearchSuggestions from "../../search-suggestions"

interface HeaderInputProps {
    searchInput: string
    setSearchInput: (value: string) => void
    suggestions: Suggestion[]
    toggleSearch: () => void
}

export default function HeaderInput({ searchInput, setSearchInput, suggestions, toggleSearch }: HeaderInputProps) {
    return (
        <>
            <input type="text"
                placeholder="Search for restaurants, cuisine, chef"
                value={searchInput}
                onChange={({ target }) => setSearchInput(target.value)} />
            <SearchSuggestions suggestions={suggestions} toggleSearch={toggleSearch} />
        </>
    )
}