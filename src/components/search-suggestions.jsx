/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export default function SearchSuggestions({ suggestions, toggleSearch }) {

    function groupSuggestionsByType(suggestions) {
        return suggestions.reduce((acc, suggestion) => {
            if (!acc[suggestion.type]) {
                acc[suggestion.type] = []
            }
            acc[suggestion.type].push(suggestion)
            return acc
        }, {})
    }

    const groupedSuggestions = groupSuggestionsByType(suggestions)

    return (
        <>
            {Object.keys(groupedSuggestions).length > 0 && (
                <div className="suggestions">
                    {Object.keys(groupedSuggestions).map((type, idx) => (
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