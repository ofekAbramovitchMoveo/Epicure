import { Link } from "react-router-dom"

import { Suggestion } from "../types/restaurant.type"
import SuggestionSkeleton from "./skeletons/suggestion-skeleton"

interface SearchSuggestionsProps {
    suggestions: Suggestion[]
    toggleSearch?: () => void
    isSearching?: boolean
    isLoading?: boolean
}

export default function SearchSuggestions({ suggestions, toggleSearch, isSearching, isLoading }: SearchSuggestionsProps) {

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

    if (!suggestions?.length && !isSearching) return null
    return (
        <div className="suggestions">
            {(!suggestions?.length && isSearching && !isLoading) ? <div className="no-suggestions">No restaurants found</div> : (
                groupedSuggestionsKeys.length > 0 && (
                    <>
                        {groupedSuggestionsKeys.map((type, idx) => (
                            <div key={idx} className="suggestion-group">
                                <h4 className="suggestion-title">{`${type}s:`}</h4>
                                <ul>
                                    {groupedSuggestions[type].map((suggestion, idx) => (
                                        <li key={idx} className="suggestion-item">
                                            {isLoading ? (
                                                <SuggestionSkeleton />
                                            ) : (
                                                <Link to={`/${suggestion.type}/${suggestion._id}`} onClick={toggleSearch}>
                                                    {suggestion.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )
            )}
        </div>
    )
}