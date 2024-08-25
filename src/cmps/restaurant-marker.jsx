/* eslint-disable react/prop-types */
/* global google */
import { useEffect, useRef } from "react"

export default function RestaurantMarker({ position, map, title }) {
    const markerRef = useRef(null)

    useEffect(() => {
        async function createMarker() {
            if (!markerRef.current && map && google && google.maps && position) {
                if (map instanceof google.maps.Map) {
                    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

                    const marker = document.createElement("div")
                    marker.className = `restaurant-marker ${title === 'You' ? 'user' : ''}`
                    marker.textContent = title

                    markerRef.current = new AdvancedMarkerElement({
                        map,
                        position: {
                            lat: position.lat,
                            lng: position.lng
                        },
                        content: marker
                    })
                }
            }
        }
        createMarker()
    }, [map, position, title])

    return null
}