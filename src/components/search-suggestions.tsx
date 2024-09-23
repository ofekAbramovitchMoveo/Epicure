import { Link } from "react-router-dom"

import { Suggestion } from "../types/restaurant.type"

interface SearchSuggestionsProps {
    suggestions: Suggestion[]
    toggleSearch?: () => void
}

export default function SearchSuggestions({ suggestions, toggleSearch }: SearchSuggestionsProps) {

    function groupSuggestionsByType(suggestions: Suggestion[]) {
        return suggestions.reduce((acc: Record<string, Suggestion[]>, suggestion: Suggestion) => {
            if (!acc[suggestion.type]) {
                acc[suggestion.type] = []
            }
            acc[suggestion.type].push(suggestion)
            return acc
        }, {})
    }

    const groupedSuggestions = groupSuggestionsByType(suggestions)
    const groupedSuggestionsKeys = Object.keys(groupedSuggestions)

    return (
        <>
            {groupedSuggestionsKeys.length > 0 && (
                <div className="suggestions">
                    {groupedSuggestionsKeys.map((type, idx) => (
                        <div key={idx} className="suggestion-group">
                            <h4 className="suggestion-title">{`${type}s:`}</h4>
                            <ul>
                                {groupedSuggestions[type].map((suggestion, idx) => (
                                    <li key={idx} className="suggestion-item">
                                        <Link to={`/${suggestion.type}/${suggestion._id}`} onClick={toggleSearch}>
                                            {suggestion.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}