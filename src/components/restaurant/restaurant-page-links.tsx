import { useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import 'swiper/css'
import "swiper/css/bundle"
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react"
import type { Swiper as SwiperType } from 'swiper'

import { FilterBy } from "../../types/filter-by.type"

interface RestaurantPageLinksProps {
    setFilterBy: (updater: (prevState: FilterBy) => FilterBy) => void
}

export default function RestaurantPageLinks({ setFilterBy }: RestaurantPageLinksProps) {
    const location = useLocation()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const swiperRef = useRef<SwiperRef>(null)

    useEffect(() => {
        setFilterBy((prevState) => ({ ...prevState, path: location.pathname }))
        updateActiveClass()
    }, [location.pathname])

    useEffect(() => {
        updateActiveClass()
    }, [swiperRef.current?.swiper as SwiperType])

    const links = [
        { to: '/restaurants', label: 'All' },
        { to: '/restaurants/new', label: 'New' },
        { to: '/restaurants/most-popular', label: 'Most Popular' },
        { to: '/restaurants/open-now', label: 'Open Now' },
        { to: '/restaurants/map', label: 'Map View' }
    ]

    function updateActiveClass() {
        if (!swiperRef.current?.swiper) return
        const swiperSlides = Array.from(swiperRef.current?.swiper?.slides || [])
        swiperSlides.forEach(slide => {
            const navLink = slide.children[0] as HTMLElement
            if (navLink?.classList.contains('active')) {
                slide.classList.add('active')
            } else {
                slide.classList.remove('active')
            }
        })
    }

    return (
        <section className="restaurant-page-links">
            {isMobile ? (
                <Swiper ref={swiperRef} spaceBetween={21} slidesPerView={'auto'}>
                    {links.map((link) => (
                        <SwiperSlide key={link.to} style={{ width: 'auto', }}>
                            <NavLink to={link.to} end>
                                {link.label}
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                links.map(link => (
                    <NavLink key={link.to} to={link.to} end>{link.label}</NavLink>
                ))
            )}
        </section>
    )
}