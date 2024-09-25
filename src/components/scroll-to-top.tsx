import { useEffect } from "react"
import { useLocation } from "react-router"

interface ScrollToTopProps {
    children: React.ReactNode
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return <>{children}</>
}