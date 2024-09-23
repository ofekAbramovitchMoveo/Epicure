import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

interface ChefPageLinksProps {
    setChefFilterBy: (updater: (prevState: { sortBy: string | null, limit: string | null }) => { sortBy: string | null, limit: string | null }) => void
}

export default function ChefPageLinks({ setChefFilterBy }: ChefPageLinksProps) {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const sortBy = searchParams.get('sortBy')
    const limit = searchParams.get('limit')

    const links = [
        { to: '/chefs', label: 'All' },
        { to: '/chefs?sortBy=createdAt&limit=6', label: 'New' },
        { to: '/chefs?sortBy=views&limit=3', label: 'Most Viewed' },
    ]

    useEffect(() => {
        setChefFilterBy((prevState) => ({ ...prevState, sortBy, limit }))
    }, [location.search])

    const checkIsActive = (to: string) => {
        const linkSearchParams = new URLSearchParams(to.split('?')[1])
        const currentSearchParams = new URLSearchParams(location.search)
        return Array.from(linkSearchParams.entries()).every(([key, value]) => currentSearchParams.get(key) === value) &&
            Array.from(currentSearchParams.entries()).every(([key, value]) => linkSearchParams.get(key) === value)
    }

    return (
        <section className="chef-page-links">
            {links.map(link => (
                <NavLink key={link.to} to={link.to} end
                    className={({ isActive }) => isActive && checkIsActive(link.to) ? 'active' : ''}>
                    {link.label}
                </NavLink>
            ))}
        </section>
    )
}