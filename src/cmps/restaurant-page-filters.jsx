/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import arrow from '/imgs/arrow-down.svg'
import { Box, Checkbox, FormControlLabel, Modal, Slider } from '@mui/material'
import { utilService } from '../services/util.service'

export default function RestaurantPageFilters({ setFilterBy }) {
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
    const [isDistanceModalOpen, setIsDistanceModalOpen] = useState(false)
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
    const [priceRange, setPriceRange] = useState([12, 357])
    const [distance, setDistance] = useState([0, 4])
    const [selectedRatings, setSelectedRatings] = useState([])
    const [priceModalHeight, setPriceModalHeight] = useState('162px')
    const [distanceModalHeight, setDistanceModalHeight] = useState('137px')
    const [ratingModalHeight, setRatingModalHeight] = useState('324px')
    const priceContainerRef = useRef(null)
    const distanceContainerRef = useRef(null)
    const ratingContainerRef = useRef(null)
    const priceSliderRef = useRef(null)
    const distanceSliderRef = useRef(null)

    useEffect(() => {
        handleRatingModalHeight()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRatings])

    useEffect(() => {
        if (setFilterBy) {
            setFilterBy(prevState => ({ ...prevState, ratings: selectedRatings, priceRange, distance }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handlePriceChange = (ev, newValue) => {
        setPriceRange(newValue)
        handlePriceModalHeight(newValue)
    }

    const handleDistanceChange = (ev, newValue) => {
        setDistance([0, newValue[1]])
        handleDistanceModalHeight(newValue)
    }

    const handleRatingChange = ({ target }) => {
        const value = parseInt(target.value)
        setSelectedRatings(prevState => target.checked ? [...prevState, value] : prevState.filter(rating => rating !== value))
    }

    const valueLabelFormat = (value, index) => {
        return index === 0 ? 'My location' : `${value}km`
    }

    const getIsActiveClassMin = (sliderRef) => {
        if (sliderRef.current) {
            if (priceRange[0] !== 12) {
                sliderRef.current.children[2].style.color = '#DE9200'
                return 'active'
            } else {
                sliderRef.current.children[2].style.color = '#000'
                return ''
            }
        }
    }

    const getIsActiveClassMax = (sliderRef) => {
        if (sliderRef.current) {
            if (priceRange[1] !== 357 || distance[1] !== 4) {
                sliderRef.current.children[3].style.color = '#DE9200'
                return 'active'
            } else {
                sliderRef.current.children[3].style.color = '#000'
                return ''
            }
        }
    }

    const handlePriceModalHeight = (newValue) => {
        if (newValue[0] !== 12 || newValue[1] !== 357) {
            setPriceModalHeight('197px')
        } else {
            setPriceModalHeight('162px')
        }
    }

    const handleDistanceModalHeight = (newValue) => {
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
                    <Modal
                        className='price-range-modal'
                        hideBackdrop
                        open={isPriceModalOpen}
                        onClose={togglePriceModal}
                        aria-labelledby="price-range-modal-title"
                        aria-describedby="price-range-modal-description"
                        disableScrollLock
                        disableEnforceFocus
                        disableAutoFocus
                        container={priceContainerRef.current}
                        sx={{ bottom: 'auto' }}>
                        <Box className={`price-range-box filter-modal ${priceModalHeight === '197px' ? 'expanded' : ''}`}
                            sx={{ height: priceModalHeight, transition: 'height 0.4s linear' }}
                        >
                            <h6 className="price-range-title">Price Range Selected</h6>
                            <p>₪12 - ₪357</p>
                            <div className="slider-container">
                                <Slider
                                    ref={priceSliderRef}
                                    className='price-slider'
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay='off'
                                    min={12}
                                    max={357}
                                />
                                <div className="fixed-labels">
                                    <span className={`label-min ${getIsActiveClassMin(priceSliderRef)}`}>₪{priceRange[0]}</span>
                                    <span className={`label-max ${getIsActiveClassMax(priceSliderRef)}`}>₪{priceRange[1]}</span>
                                </div>
                            </div>
                            {priceModalHeight === '197px' && (
                                <button className="clear-btn" onClick={handleClearPrice}>CLEAR</button>
                            )}
                        </Box>
                    </Modal>
                )}
            </div>
            <div className="distance-container" ref={distanceContainerRef}>
                <button className="distance" onClick={toggleDistanceModal}>Distance <img src={arrow} alt="" /></button>
                {isDistanceModalOpen && (
                    <Modal className='distance-modal'
                        hideBackdrop
                        open={isDistanceModalOpen}
                        onClose={toggleDistanceModal}
                        aria-labelledby="distance-modal-title"
                        aria-describedby="distance-modal-description"
                        disableScrollLock
                        disableEnforceFocus
                        disableAutoFocus
                        container={distanceContainerRef.current}
                        sx={{ bottom: 'auto' }}>
                        <Box className={`distance-box filter-modal ${distanceModalHeight === '167px' ? 'expanded' : ''}`}
                            sx={{ height: distanceModalHeight, transition: 'height 0.4s linear' }}
                        >
                            <h6 className="distance-title">Distance</h6>
                            <div className="slider-container">
                                <Slider
                                    ref={distanceSliderRef}
                                    className='distance-slider'
                                    value={distance}
                                    onChange={handleDistanceChange}
                                    valueLabelDisplay='on'
                                    max={4}
                                    valueLabelFormat={valueLabelFormat}
                                />
                                <div className="fixed-labels">
                                    <span className={`${getIsActiveClassMax(distanceSliderRef)}`}>{distance[1]}km</span>
                                </div>
                            </div>
                            {distanceModalHeight === '167px' && (
                                <button className="clear-btn" onClick={handleClearDistance}>CLEAR</button>
                            )}
                        </Box>
                    </Modal>
                )}
            </div>
            <div className="rating-container" ref={ratingContainerRef}>
                <button className="rating" onClick={toggleRatingModal}>Rating <img src={arrow} alt="" /></button>
                {isRatingModalOpen && (
                    <Modal className='rating-modal'
                        hideBackdrop
                        open={isRatingModalOpen}
                        onClose={toggleRatingModal}
                        aria-labelledby="rating-modal-title"
                        aria-describedby="rating-modal-description"
                        disableScrollLock
                        disableEnforceFocus
                        disableAutoFocus
                        container={ratingContainerRef.current}
                        sx={{ bottom: 'auto' }}>
                        <Box className={`rating-box filter-modal ${ratingModalHeight === '368px' ? 'expanded' : ''}`}
                            sx={{ height: ratingModalHeight, transition: 'height 0.4s linear' }}
                        >
                            <h6>Rating</h6>
                            <div className="rating-list">
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <FormControlLabel
                                        key={rating}
                                        control={
                                            <Checkbox
                                                className='checkbox'
                                                checked={selectedRatings.includes(rating)}
                                                onChange={handleRatingChange}
                                                value={rating}
                                                sx={{
                                                    color: "black",
                                                    '&.Mui-checked': {
                                                        color: "white",
                                                    }
                                                }}
                                            />
                                        }
                                        label={utilService.renderStars(rating)}
                                    />
                                ))}
                            </div>
                            {ratingModalHeight === '368px' && (
                                <button className="clear-btn" onClick={handleClearRating}>CLEAR</button>
                            )}
                        </Box>
                    </Modal>
                )}
            </div>
        </section>
    )
}