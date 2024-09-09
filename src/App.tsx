import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'

import AppFooter from './components/app-footer'
import AppHeader from './components/app-header'
import HomePage from './pages/home-page'
import RestaurantDetails from './pages/restaurant-details'
import RestaurantPage from './pages/restaurant-page'
import { restaurantService } from './services/restaurant.service'
import { loadChefs } from './store/chef/chef.actions'
import { loadRestaurants } from './store/restaurant/restaurant.actions'
import { RootState } from './store/store'
import { Suggestion } from './types/restaurant.type'

export default function App() {
    const restaurants = useSelector((storeState: RootState) => storeState.restaurantModule.restaurants)
    const chefs = useSelector((storeState: RootState) => storeState.chefModule.chefs)
    const [filterBy, setFilterBy] = useState({})
    const [searchInput, setSearchInput] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])

    useEffect(() => {
        async function fetchData() {
            await loadChefs()
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            
            try {
                await loadRestaurants(filterBy)
            } catch (error) {
                console.log('error loading restaurants', error)
            }
        }
        fetchData()
    }, [filterBy])

    useEffect(() => {
        async function fetchSuggestions() {
            const suggestions = await restaurantService.getRestaurantSuggestions(searchInput)
            setSuggestions(suggestions)
        }
        fetchSuggestions()
    }, [searchInput])

    return (
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
                    <Route path='/restaurants' element={<RestaurantPage restaurants={restaurants}
                        setFilterBy={setFilterBy}
                    />} />
                    <Route path='/restaurants/new' element={<RestaurantPage restaurants={restaurants}
                        setFilterBy={setFilterBy}
                    />} />
                    <Route path='/restaurants/most-popular' element={<RestaurantPage restaurants={restaurants}
                        setFilterBy={setFilterBy}
                    />} />
                    <Route path='/restaurants/open-now' element={<RestaurantPage restaurants={restaurants}
                        setFilterBy={setFilterBy}
                    />} />
                    <Route path='/restaurants/map' element={<RestaurantPage restaurants={restaurants}
                        setFilterBy={setFilterBy} />} />
                    <Route path='/restaurant/:restaurantId' element={<RestaurantDetails />} />
                    <Route path='/restaurant/:restaurantId/lunch' element={<RestaurantDetails />} />
                    <Route path='/restaurant/:restaurantId/dinner' element={<RestaurantDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </section>
    )
}