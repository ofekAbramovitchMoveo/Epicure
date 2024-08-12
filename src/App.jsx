import { Routes, Route } from 'react-router'
import AppHeader from './cmps/app-header'
import HomePage from './pages/home-page'
import { useEffect, useState } from 'react'
import { restaurantService } from './services/restaurant.service'
import { useSelector } from 'react-redux'
import { loadRestaurants } from './store/restaurant/restaurant.actions'
import { loadChefs } from './store/chef/chef.actions'

export default function App() {
    const restaurants = useSelector(storeState => storeState.restaurantModule.restaurants)
    const chefs = useSelector(storeState => storeState.chefModule.chefs)
    const [searchInput, setSearchInput] = useState("")
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        loadRestaurants()
        loadChefs()
    }, [])

    useEffect(() => {
        setSuggestions(restaurantService.getRestaurantSuggestions(searchInput))
    }, [searchInput, restaurants])

    return (
        <>
            <section className="app main-layout">
                <AppHeader suggestions={suggestions}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                />
                <main className="main-container full">
                    <Routes>
                        <Route path='/' element={<HomePage suggestions={suggestions}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            restaurants={restaurants}
                            chefs={chefs}
                        />} />
                    </Routes>
                </main>
            </section>
        </>
    )
}