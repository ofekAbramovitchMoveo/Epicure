import { Routes, Route } from 'react-router'
import AppHeader from './cmps/app-header'
import HomePage from './pages/home-page'
import { useSelector } from 'react-redux'
import { loadRestaurants } from './store/restaurant/restaurant.actions'
import { loadChefs } from './store/chef/chef.actions'
import { useEffect } from 'react'
import RestaurantPage from './pages/restaurant-page'
import AppFooter from './cmps/app-footer'

export default function App() {
    const restaurants = useSelector(storeState => storeState.restaurantModule.restaurants)
    const chefs = useSelector(storeState => storeState.chefModule.chefs)

    useEffect(() => {
        loadRestaurants()
        loadChefs()
    }, [])
    return (
        <section className="app main-layout">
            <AppHeader />
            <main className="main-container full">
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/restaurant' element={<RestaurantPage restaurants={restaurants} />} />
                    <Route path='/restaurant/new' element={<RestaurantPage restaurants={restaurants} />} />
                    <Route path='/restaurant/most-popular' element={<RestaurantPage restaurants={restaurants} />} />
                    <Route path='/restaurant/open-now' element={<RestaurantPage restaurants={restaurants} />} />
                    <Route path='/restaurant/map' element={<RestaurantPage restaurants={restaurants} />} />

                </Routes>
            </main>
            <AppFooter />
        </section>
    )
}