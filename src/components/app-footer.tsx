import { useLocation } from "react-router"

export default function AppFooter() {
    const location = useLocation()
    const isHomePage = location.pathname === '/'
    const isMapView = location.pathname.includes('map')

    return (
        <footer className="app-footer full main-layout" style={!isHomePage && !isMapView ? { marginTop: '48px' } : {}}>
            <div className="footer-container">
                <ul className="links">
                    <li>
                        Contact Us
                    </li>
                    <li>
                        Term of Use
                    </li>
                    <li>
                        Privacy Policy
                    </li>
                </ul>
            </div>
        </footer>
    )
}