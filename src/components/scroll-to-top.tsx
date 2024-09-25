import { useEffect, useRef } from "react"
import { useLocation } from "react-router"

interface ScrollToTopProps {
    children: React.ReactNode
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
    const location = useLocation()
    const prevPathnameRef = useRef<string | null>(null)


    useEffect(() => {
        const prevPathname = prevPathnameRef.current
        prevPathnameRef.current = location.pathname

        const isSameRestaurantDetails = prevPathname?.startsWith('/restaurant/') && location.pathname.startsWith('/restaurant/')
        const isDifferentMealTime = (prevPathname?.includes('/lunch') || prevPathname?.includes('/dinner') || prevPathname === `/restaurant/${location.pathname.split('/')[2]}`) &&
            (location.pathname.includes('/lunch') || location.pathname.includes('/dinner') || location.pathname === `/restaurant/${location.pathname.split('/')[2]}`)


        if (!isSameRestaurantDetails && !isDifferentMealTime) {
            window.scrollTo(0, 0)
        }
    }, [location.pathname])

    return <>{children}</>
}