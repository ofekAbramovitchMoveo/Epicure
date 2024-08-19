/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

export default function RestaurantPageLinks({ setFilterBy }) {
    const location = useLocation()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const swiperRef = useRef(null)

    useEffect(() => {
        setFilterBy(prevState => ({ ...prevState, path: location.pathname }))
        updateActiveClass()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        updateActiveClass()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swiperRef.current?.children[0]?.children])

    const links = [
        { to: '/restaurant', label: 'All' },
        { to: '/restaurant/new', label: 'New' },
        { to: '/restaurant/most-popular', label: 'Most Popular' },
        { to: '/restaurant/open-now', label: 'Open Now' },
        { to: '/restaurant/map', label: 'Map View' }
    ]

    function updateActiveClass() {
        if (!swiperRef.current) return
        const swiperSlides = Array.from(swiperRef.current?.children[0]?.children)
        swiperSlides.forEach(slide => {
            const navLink = slide.children[0]
            if (navLink.classList.contains('active')) {
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