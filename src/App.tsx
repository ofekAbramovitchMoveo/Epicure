import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import AppFooter from './components/app-footer'
import AppHeader from './components/header/components/app-header'
import HomePage from './pages/home-page'
import RestaurantDetails from './components/restaurant/pages/restaurant-details'
import RestaurantPage from './components/restaurant/pages/restaurant-page'
import { RootState } from './store/store'
import CheckoutPage from './components/checkout/pages/checkout-page'
import CheckoutSuccessModal from './components/modals/checkout-success-modal'
import WarningDialog from './components/modals/warning-dialog'
import OrderHistory from './components/order/pages/order-history'
import ChefPage from './components/chef/pages/chef-page'
import { utilService } from './services/util.service'
import ScrollToTop from './components/scroll-to-top'

export interface Coordinates {
    lat: number
    lng: number
}

export default function App() {
    const isCheckoutSuccessOpen = useSelector((storeState: RootState) => storeState.orderModule.isCheckoutSuccessOpen)
    const isWarningPopupOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isWarningPopupOpen)
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
    const [isAnyDishOrderOpen, setIsAnyDishOrderOpen] = useState(false)
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

    const toggleIsAnyDishOrderOpen = () => setIsAnyDishOrderOpen(!isAnyDishOrderOpen)

    return (
        <>
            <section className="app main-layout">
                <AppHeader />
                <main className="main-container full">
                    <ScrollToTop>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/restaurants' element={<RestaurantPage userLocation={userLocation} />} />
                            <Route path='/restaurants?sortBy=createdAt' element={<RestaurantPage userLocation={userLocation} />} />
                            <Route path='/restaurants?sortBy=rating' element={<RestaurantPage userLocation={userLocation} />} />
                            <Route path='/restaurants/open-now' element={<RestaurantPage userLocation={userLocation} />} />
                            <Route path='/restaurants/map' element={<RestaurantPage userLocation={userLocation} />} />
                            <Route path='/restaurant/:restaurantId' element={<RestaurantDetails toggleIsAnyDishOrderOpen={toggleIsAnyDishOrderOpen} />} />
                            <Route path='/restaurant/:restaurantId/lunch' element={<RestaurantDetails toggleIsAnyDishOrderOpen={toggleIsAnyDishOrderOpen} />} />
                            <Route path='/restaurant/:restaurantId/dinner' element={<RestaurantDetails toggleIsAnyDishOrderOpen={toggleIsAnyDishOrderOpen} />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/order-history' element={<OrderHistory />} />
                            <Route path='/chefs' element={<ChefPage />} />
                            <Route path='/chefs?sortBy=createdAt&limit=6' element={<ChefPage />} />
                            <Route path='/chefs?sortBy=views&limit=3' element={<ChefPage />} />
                        </Routes>
                    </ScrollToTop>
                </main>
                {(!isCheckoutPage || (isCheckoutPage && !isMobile)) && <AppFooter />}
            </section>
            {isCheckoutSuccessOpen && <CheckoutSuccessModal />}
            {isWarningPopupOpen && !isAnyDishOrderOpen && <WarningDialog />}
        </>
    )
}