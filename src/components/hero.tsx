import { Suggestion } from "../types/restaurant.type"
import Image from "./image"
import SearchSuggestions from "./search-suggestions"

interface HeroProps {
    suggestions: Suggestion[]
    searchInput: string
    setSearchInput: (value: string) => void
}

export default function Hero({ suggestions, searchInput, setSearchInput }: HeroProps) {
    return (
        <div className="hero-container full main-layout">
            <Image className="hero-img full" src="hero.png" alt="" />
            <div className="hero-box">
                <p className="hero-text">
                    Epicure works with the top <br />
                    chef restaurants in Tel Aviv
                </p>
                <div className="input-container">
                    <Image src="search-icon.svg" alt="" className="search-icon" />
                    <input type="text" placeholder="Search for restaurants, cuisine, chef"
                        value={searchInput} onChange={({ target }) => setSearchInput(target.value)} />
                    <SearchSuggestions suggestions={suggestions} />
                </div>
            </div>
        </div>
    )
}