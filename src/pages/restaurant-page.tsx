import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useMediaQuery } from "react-responsive"

import Map from "../components/map/map"
import RestaurantList from "../components/restaurant/restaurant-list"
import RestaurantPageFilters from "../components/restaurant/restaurant-page-filters"
import RestaurantPageLinks from "../components/restaurant/restaurant-page-links"
import { loadRestaurants, toggleLocationWarningPopup } from "../store/restaurant/restaurant.actions"
import { utilService } from "../services/util.service"
import LocationWarningDialog from "../components/modals/location-warning-dialog"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { loadChefs } from "../store/chef/chef.actions"

export interface Coordinates {
    lat: number
    lng: number
}

export default function RestaurantPage() {
    const restaurants = useSelector((storeState: RootState) => storeState.restaurantModule.restaurants)
    const [filterBy, setFilterBy] = useState({})
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const isMapView = location.pathname.includes('map')

    useEffect(() => {
        async function fetchData() {
            try {
                await loadRestaurants(filterBy)
                await loadChefs()
            } catch (error) {
                console.log('error loading restaurants or chefs', error)
            }
        }
        fetchData()
    }, [filterBy])

    useEffect(() => {
        async function fetchUserLocation() {
            const location = await utilService.getUserLocation()
            setUserLocation(location)
        }
        fetchUserLocation()
        if (!userLocation) toggleLocationWarningPopup()
    }, [userLocation])

    return (
        <>
            <section className="restaurant-page main-layout full">
                {isMobile && (
                    <h1 className="title">RESTAURANTS</h1>
                )}
                <RestaurantPageLinks setFilterBy={setFilterBy} />
                <RestaurantPageFilters setFilterBy={setFilterBy} />
                {!isMapView ? (
                    <RestaurantList restaurants={restaurants} isChefRestaurants={false} />
                ) : (
                    <Map restaurants={restaurants} userLocation={userLocation} />
                )}
            </section>
            {!userLocation && <LocationWarningDialog />}
        </>
    )
}