import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { utilService } from '../../services/util.service'
import PriceRangeModal from '../modals/price-range-modal'
import DistanceModal from '../modals/distance-modal'
import RatingsModal from '../modals/ratings-modal'
import { FilterBy } from '../../types/filter-by.type'

import arrow from '/imgs/arrow-down.svg'

interface RestaurantPageFiltersProps {
    setFilterBy: (updater: (prevState: FilterBy) => FilterBy) => void
}

export default function RestaurantPageFilters({ setFilterBy }: RestaurantPageFiltersProps) {
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
    const [isDistanceModalOpen, setIsDistanceModalOpen] = useState(false)
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
    const [priceRange, setPriceRange] = useState<[number, number]>([12, 357])
    const [distance, setDistance] = useState<[number, number]>([0, 4])
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])
    const [priceModalHeight, setPriceModalHeight] = useState('162px')
    const [distanceModalHeight, setDistanceModalHeight] = useState('137px')
    const [ratingModalHeight, setRatingModalHeight] = useState('324px')
    const priceContainerRef = useRef(null)
    const distanceContainerRef = useRef(null)
    const ratingContainerRef = useRef(null)
    const priceSliderRef = useRef(null)
    const distanceSliderRef = useRef(null)
    const isMobile = useMediaQuery({ query: '(max-width: 740px)' })

    useEffect(() => {
        handleRatingModalHeight()
    }, [selectedRatings])

    useEffect(() => {
        if (setFilterBy) {
            const debouncedSetFilterBy = utilService.debounce(() => {
                setFilterBy(prevState => ({ ...prevState, ratings: selectedRatings, priceRange, distance }))
            }, 300)
            debouncedSetFilterBy()
        }
    }, [selectedRatings, distance, priceRange])

    const togglePriceModal = () => {
        setIsDistanceModalOpen(false)
        setIsRatingModalOpen(false)
        setIsPriceModalOpen(!isPriceModalOpen)
    }

    const toggleDistanceModal = () => {
        setIsPriceModalOpen(false)
        setIsRatingModalOpen(false)
        setIsDistanceModalOpen(!isDistanceModalOpen)
    }

    const toggleRatingModal = () => {
        setIsPriceModalOpen(false)
        setIsDistanceModalOpen(false)
        setIsRatingModalOpen(!isRatingModalOpen)
    }

    const handlePriceChange = (ev: Event, newValue: number | number[]) => {
        setPriceRange(newValue as [number, number])
        handlePriceModalHeight(newValue as [number, number])
    }

    const handleDistanceChange = (ev: Event, newValue: number | number[]) => {
        const values = Array.isArray(newValue) ? newValue : [newValue, newValue]
        setDistance([0, values[1]])
        handleDistanceModalHeight(values as [number, number])
    }

    const handleRatingChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(target.value)
        setSelectedRatings(prevState => target.checked ? [...prevState, value] : prevState.filter(rating => rating !== value))
    }

    const valueLabelFormat = (value: number, index: number) => {
        return index === 0 ? 'My location' : `${value}km`
    }

    const getIsActiveClassMin = (sliderRef: React.RefObject<HTMLDivElement>): string => {
        if (sliderRef.current) {
            if (priceRange[0] !== 12) {
                (sliderRef.current.children[2] as HTMLElement).style.color = '#DE9200'
                return 'active'
            } else {
                (sliderRef.current.children[2] as HTMLElement).style.color = '#000'
                return ''
            }
        }
        return ''
    }

    const getIsActiveClassMax = (sliderRef: React.RefObject<HTMLDivElement>): string => {
        if (sliderRef.current) {
            if (priceRange[1] !== 357 || distance[1] !== 4) {
                (sliderRef.current.children[3] as HTMLElement).style.color = '#DE9200'
                return 'active'
            } else {
                (sliderRef.current.children[3] as HTMLElement).style.color = '#000'
                return ''
            }
        }
        return ''
    }

    const handlePriceModalHeight = (newValue: [number, number]) => {
        if (newValue[0] !== 12 || newValue[1] !== 357) {
            setPriceModalHeight('197px')
        } else {
            setPriceModalHeight('162px')
        }
    }

    const handleDistanceModalHeight = (newValue: [number, number]) => {
        if (newValue[1] !== 4) {
            setDistanceModalHeight('167px')
        } else {
            setDistanceModalHeight('137px')
        }
    }

    const handleRatingModalHeight = () => {
        if (selectedRatings.length > 0) {
            setRatingModalHeight('368px')
        } else {
            setRatingModalHeight('324px')
        }
    }

    const handleClearPrice = () => {
        setPriceRange([12, 357])
        setPriceModalHeight('162px')
    }

    const handleClearDistance = () => {
        setDistance([0, 4])
        setDistanceModalHeight('137px')
    }

    const handleClearRating = () => {
        setSelectedRatings([])
    }

    return (
        <section className="restaurant-page-filters full">
            <div className="price-container" ref={priceContainerRef}>
                <button className="price" onClick={togglePriceModal}>Price Range <img src={arrow} alt="" /></button>
                {isPriceModalOpen && (
                    <PriceRangeModal
                        isPriceModalOpen={isPriceModalOpen}
                        togglePriceModal={togglePriceModal}
                        priceContainerRef={priceContainerRef}
                        priceModalHeight={priceModalHeight}
                        handleClearPrice={handleClearPrice}
                        priceSliderRef={priceSliderRef}
                        priceRange={priceRange}
                        handlePriceChange={handlePriceChange}
                        getIsActiveClassMin={getIsActiveClassMin}
                        getIsActiveClassMax={getIsActiveClassMax}
                        isMobile={isMobile}
                    />
                )}
            </div>
            <div className="distance-container" ref={distanceContainerRef}>
                <button className="distance" onClick={toggleDistanceModal}>Distance <img src={arrow} alt="" /></button>
                {isDistanceModalOpen && (
                    <DistanceModal
                        isDistanceModalOpen={isDistanceModalOpen}
                        toggleDistanceModal={toggleDistanceModal}
                        distanceContainerRef={distanceContainerRef}
                        distanceModalHeight={distanceModalHeight}
                        handleClearDistance={handleClearDistance}
                        distanceSliderRef={distanceSliderRef}
                        distance={distance}
                        handleDistanceChange={handleDistanceChange}
                        getIsActiveClassMax={getIsActiveClassMax}
                        valueLabelFormat={valueLabelFormat}
                        isMobile={isMobile}
                    />
                )}
            </div>
            <div className="rating-container" ref={ratingContainerRef}>
                <button className="rating" onClick={toggleRatingModal}>Rating <img src={arrow} alt="" /></button>
                {isRatingModalOpen && (
                    <RatingsModal
                        isRatingModalOpen={isRatingModalOpen}
                        toggleRatingModal={toggleRatingModal}
                        ratingContainerRef={ratingContainerRef}
                        ratingModalHeight={ratingModalHeight}
                        handleClearRating={handleClearRating}
                        selectedRatings={selectedRatings}
                        handleRatingChange={handleRatingChange}
                        isMobile={isMobile}
                    />
                )}
            </div>
        </section>
    )
}