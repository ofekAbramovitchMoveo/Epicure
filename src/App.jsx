import { Routes, Route } from 'react-router'
import AppHeader from './cmps/app-header'
import HomePage from './pages/home-page'
import { useEffect, useState } from 'react'
import { restaurantService } from './services/restaurant.service'
import { useSelector } from 'react-redux'
import { loadRestaurants } from './store/restaurant/restaurant.actions'
import { loadChefs } from './store/chef/chef.actions'
import RestaurantPage from './pages/restaurant-page'
import AppFooter from './cmps/app-footer'
import RestaurantDetails from './pages/restaurant-details'

export default function App() {
    const restaurants = useSelector(storeState => storeState.restaurantModule.restaurants)
    const chefs = useSelector(storeState => storeState.chefModule.chefs)
    const [filterBy, setFilterBy] = useState({})
    const [searchInput, setSearchInput] = useState("")
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        async function fetchData() {
            await loadRestaurants(filterBy)
            loadChefs()
        }
        fetchData()
    }, [filterBy])

    useEffect(() => {
        setSuggestions(restaurantService.getRestaurantSuggestions(searchInput))
    }, [searchInput, restaurants])

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
                    <Route path='/restaurant' element={<RestaurantPage restaurants={restaurants} setFilterBy={setFilterBy} />} />
                    <Route path='/restaurant/new' element={<RestaurantPage restaurants={restaurants} setFilterBy={setFilterBy} />} />
                    <Route path='/restaurant/most-popular' element={<RestaurantPage restaurants={restaurants} setFilterBy={setFilterBy} />} />
                    <Route path='/restaurant/open-now' element={<RestaurantPage restaurants={restaurants} setFilterBy={setFilterBy} />} />
                    <Route path='/restaurant/map' element={<RestaurantPage restaurants={restaurants} setFilterBy={setFilterBy} />} />
                    <Route path='/restaurant/:restaurantId' element={<RestaurantDetails />} />
                    <Route path='/restaurant/:restaurantId/lunch' element={<RestaurantDetails />} />
                    <Route path='/restaurant/:restaurantId/dinner' element={<RestaurantDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </section>
    )
}