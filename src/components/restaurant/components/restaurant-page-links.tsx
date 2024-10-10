import { useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react"
import 'swiper/css'
import "swiper/css/bundle"

import { FilterBy } from "../../../types/filter-by.type"
import { resetRestaurants } from "../../../store/restaurant/restaurant.actions"

interface RestaurantPageLinksProps {
    setFilterBy: (updater: (prevState: FilterBy) => FilterBy) => void
}

export default function RestaurantPageLinks({ setFilterBy }: RestaurantPageLinksProps) {
    const location = useLocation()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const swiperRef = useRef<SwiperRef>(null)
    const searchParams = new URLSearchParams(location.search)
    const sortBy = searchParams.get('sortBy')

    useEffect(() => {
        resetRestaurants()
        setFilterBy((prevState) => ({ ...prevState, sortBy, isOpenNowPage: location.pathname === '/restaurants/open-now' }))
    }, [location.pathname, location.search])

    const links = [
        { to: '/restaurants', label: 'All' },
        { to: '/restaurants?sortBy=createdAt', label: 'New' },
        { to: '/restaurants?sortBy=rating', label: 'Most Popular' },
        { to: '/restaurants/open-now', label: 'Open Now' },
        { to: '/restaurants/map', label: 'Map View' }
    ]

    const checkIsActive = (to: string) => {
        const linkSearchParams = new URLSearchParams(to.split('?')[1])
        const currentSearchParams = new URLSearchParams(location.search)
        return Array.from(linkSearchParams.entries()).every(([key, value]) => currentSearchParams.get(key) === value) &&
            Array.from(currentSearchParams.entries()).every(([key, value]) => linkSearchParams.get(key) === value)
    }

    return (
        <section className="restaurant-page-links">
            {isMobile ? (
                <Swiper ref={swiperRef} spaceBetween={21} slidesPerView={'auto'}>
                    {links.map((link) => (
                        <SwiperSlide key={link.to} style={{ width: 'auto', paddingBottom: '1.8px' }}>
                            <NavLink to={link.to} end className={({ isActive }) => isActive && checkIsActive(link.to) ? 'active' : ''}>
                                {link.label}
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                links.map(link => (
                    <NavLink key={link.to} to={link.to} end className={({ isActive }) => isActive && checkIsActive(link.to) ? 'active' : ''}>
                        {link.label}
                    </NavLink>
                ))
            )}
        </section>
    )
}