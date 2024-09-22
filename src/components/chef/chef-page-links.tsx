import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

interface ChefPageLinksProps {
    setChefFilterBy: (updater: (prevState: { path: string }) => { path: string }) => void
}

export default function ChefPageLinks({ setChefFilterBy }: ChefPageLinksProps) {
    const location = useLocation()

    const links = [
        { to: '/chefs', label: 'All' },
        { to: '/chefs/new', label: 'New' },
        { to: '/chefs/most-viewed', label: 'Most Viewed' },
    ]

    useEffect(() => {
        setChefFilterBy((prevState) => ({ ...prevState, path: location.pathname }))
    }, [location.pathname])

    return (
        <section className="chef-page-links">
            {links.map(link => (
                <NavLink key={link.to} to={link.to} end>{link.label}</NavLink>
            ))}
        </section>
    )
}