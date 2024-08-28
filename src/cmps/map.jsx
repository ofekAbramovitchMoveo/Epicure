/* eslint-disable react/prop-types */
import { useRef, useState, useCallback, useEffect } from "react"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import RestaurantMarker from "./restaurant-marker"
import { useMediaQuery } from "react-responsive"
import { restaurantService } from "../services/restaurant.service"

export default function Map({ restaurants }) {
    const [map, setMap] = useState(null)
    const [currentRestaurants, setCurrentRestaurants] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const mapRef = useRef(null)

    useEffect(() => {
        async function fetchUserLocation() {
            const location = await restaurantService.getUserLocation()
            setUserLocation(location)
        }
        fetchUserLocation()
    }, [])

    useEffect(() => {
        setCurrentRestaurants(restaurants)
    }, [restaurants])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBPSnSB3KM1tGH3au7TEh0NXRhzvaRQZlA"
    })

    const mapContainerStyle = {
        width: '100%',
        height: '78vh',
        gridColumn: isMobile ? "1 / -1" : "2"
    }

    const onLoad = useCallback((map) => {
        setMap(map)
        mapRef.current = map
    }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
        mapRef.current = null
    }, [])

    const defaultLocation = { lat: 32.0853, lng: 34.7818 }

    return isLoaded && userLocation ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: userLocation?.lat || defaultLocation.lat, lng: userLocation?.lng || defaultLocation.lng }}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ mapId: "bf940397493a94a5" }}
        >
            {currentRestaurants.map(restaurant => (
                <RestaurantMarker
                    key={restaurant.id}
                    position={{ lat: restaurant.location.lat, lng: restaurant.location.lng }}
                    map={map}
                    title={restaurant.name} />

            ))}
            <RestaurantMarker position={userLocation} map={map} title={`You`} />
        </GoogleMap>
    ) : <></>
}