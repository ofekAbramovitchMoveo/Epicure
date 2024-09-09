import { useEffect, useRef } from "react"

interface RestaurantMarkerProps {
    position: { lat: number, lng: number }
    map: google.maps.Map | null
    title: string
}

export default function RestaurantMarker({ position, map, title }: RestaurantMarkerProps) {
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)

    useEffect(() => {
        async function createMarker() {
            if (!markerRef.current && map && google && google.maps && position) {
                if (map instanceof google.maps.Map) {
                    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary

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