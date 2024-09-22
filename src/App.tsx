import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import AppFooter from './components/app-footer'
import AppHeader from './components/app-header'
import HomePage from './pages/home-page'
import RestaurantDetails from './pages/restaurant-details'
import RestaurantPage from './pages/restaurant-page'
import { clearBag, setWarningPopup, toggleBag } from './store/restaurant/restaurant.actions'
import { RootState } from './store/store'
import CheckoutPage from './pages/checkout-page'
import CheckoutSuccessModal from './components/modals/checkout-success-modal'
import WarningDialog from './components/modals/warning-dialog'
import OrderHistory from './pages/order-history'
import ChefPage from './pages/chef-page'
import { utilService } from './services/util.service'

export interface Coordinates {
    lat: number
    lng: number
}

export default function App() {
    const isCheckoutSuccessOpen = useSelector((storeState: RootState) => storeState.orderModule.isCheckoutSuccessOpen)
    const isWarningPopupOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isWarningPopupOpen)
    const isBagOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isBagOpen)
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const isCheckoutPage = location.pathname.includes('/checkout')

    useEffect(() => {
        async function fetchUserLocation() {
            const location = await utilService.getUserLocation()
            setUserLocation(location)
        }
        fetchUserLocation()
    }, [userLocation?.lat, userLocation?.lng])

    function onClearBag() {
        clearBag()
        setWarningPopup(false)
        if (!isBagOpen) toggleBag()
    }

    return (
        <>
            <section className="app main-layout">
                <AppHeader />
                <main className="main-container full">
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/restaurants' element={<RestaurantPage userLocation={userLocation} />} />
                        <Route path='/restaurants/new' element={<RestaurantPage userLocation={userLocation} />} />
                        <Route path='/restaurants/most-popular' element={<RestaurantPage userLocation={userLocation} />} />
                        <Route path='/restaurants/open-now' element={<RestaurantPage userLocation={userLocation} />} />
                        <Route path='/restaurants/map' element={<RestaurantPage userLocation={userLocation} />} />
                        <Route path='/restaurant/:restaurantId' element={<RestaurantDetails />} />
                        <Route path='/restaurant/:restaurantId/lunch' element={<RestaurantDetails />} />
                        <Route path='/restaurant/:restaurantId/dinner' element={<RestaurantDetails />} />
                        <Route path='/checkout' element={<CheckoutPage />} />
                        <Route path='/order-history' element={<OrderHistory />} />
                        <Route path='/chefs' element={<ChefPage />} />
                        <Route path='/chefs/new' element={<ChefPage />} />
                        <Route path='/chefs/most-viewed' element={<ChefPage />} />
                    </Routes>
                </main>
                {(!isCheckoutPage || (isCheckoutPage && !isMobile)) && <AppFooter />}
            </section>
            {isCheckoutSuccessOpen && <CheckoutSuccessModal />}
            {isWarningPopupOpen && <WarningDialog onClearBag={onClearBag} />}
        </>
    )
}