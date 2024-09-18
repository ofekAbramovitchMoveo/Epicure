import { useLocation } from "react-router"

export default function AppFooter() {
    const location = useLocation()
    const isHomePage = location.pathname === '/'
    const isMapView = location.pathname.includes('map')
    const isOrderHistory = location.pathname.includes('order-history')

    return (
        <footer className="app-footer full main-layout" style={{
            marginTop: !isHomePage && !isMapView && !isOrderHistory ? '48px' : '0',
            ...(isOrderHistory && {
                position: 'sticky',
                bottom: '0'
            })
        }}>
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