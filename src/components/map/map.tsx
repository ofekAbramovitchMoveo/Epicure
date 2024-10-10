import { useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

import RestaurantMarker from "./restaurant-marker"
import { Restaurant } from "../../types/restaurant.type"
import LocationWarningDialog from "../modals/location-warning-dialog"
import { Coordinates } from "../../App"
import { loadRestaurants, toggleLocationWarningPopup } from "../../store/restaurant/restaurant.actions"

interface MapProps {
    restaurants: Restaurant[]
    userLocation: Coordinates | null
}

export default function Map({ restaurants, userLocation }: MapProps) {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [currentRestaurants, setCurrentRestaurants] = useState<Restaurant[]>([])
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const mapRef = useRef<google.maps.Map | null>(null)
    const defaultLocation = { lat: 32.0853, lng: 34.7818 }

    useEffect(() => {
        loadRestaurants()
    }, [])

    useEffect(() => {
        if (!userLocation) toggleLocationWarningPopup()
    }, [userLocation?.lat, userLocation?.lng])

    useEffect(() => {
        setCurrentRestaurants(restaurants)
    }, [restaurants])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    const mapContainerStyle = {
        width: '100%',
        height: '78vh',
        gridColumn: isMobile ? "1 / -1" : "2"
    }

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map)
        mapRef.current = map
    }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
        mapRef.current = null
    }, [])

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: userLocation?.lat || defaultLocation.lat, lng: userLocation?.lng || defaultLocation.lng }}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{ mapId: "bf940397493a94a5" }}
            >
                {currentRestaurants.map(restaurant => {
                    const position = {
                        lat: restaurant.location.coordinates[1],
                        lng: restaurant.location.coordinates[0]
                    }

                    return (
                        <RestaurantMarker
                            key={restaurant._id}
                            position={position}
                            map={map}
                            title={restaurant.name} />
                    )
                })}
                {userLocation && <RestaurantMarker position={userLocation} map={map} title={`You`} />}
            </GoogleMap>
            {!userLocation && <LocationWarningDialog />}
        </>
    ) : <></>
}