import { Suggestion } from "../../../types/restaurant.type"
import SearchSuggestions from "../../search-suggestions"

interface HeaderInputProps {
    searchInput: string
    setSearchInput: (value: string) => void
    suggestions: Suggestion[]
    toggleSearch: () => void
}

export default function HeaderInput({ searchInput, setSearchInput, suggestions, toggleSearch }: HeaderInputProps) {

    const handleBlur = (ev: React.FocusEvent) => {
        if (!ev.relatedTarget || !ev.relatedTarget.closest('.suggestions'))
            setSearchInput('')
    }

    return (
        <>
            <input type="text"
                placeholder="Search for restaurants"
                value={searchInput}
                onChange={({ target }) => setSearchInput(target.value)}
                onBlur={handleBlur}
            />
            <SearchSuggestions suggestions={suggestions} toggleSearch={toggleSearch} isSearching={searchInput.length > 0} />
        </>
    )
}