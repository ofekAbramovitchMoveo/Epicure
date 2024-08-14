/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'
import arrow from '/imgs/arrow-down.svg'
import { Box, Checkbox, FormControlLabel, Modal, Slider } from '@mui/material'
import { utilService } from '../services/util.service'

export default function RestaurantPageFilters() {
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
    const [isDistanceModalOpen, setIsDistanceModalOpen] = useState(false)
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
    const [priceRange, setPriceRange] = useState([12, 357])
    const [distance, setDistance] = useState([0, 4])
    const [selectedRatings, setSelectedRatings] = useState([])
    const priceContainerRef = useRef(null)
    const distanceContainerRef = useRef(null)
    const ratingContainerRef = useRef(null)

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
    }

    const handleDistanceChange = (ev, newValue) => {
        setDistance([0, newValue[1]])
    }

    const handleRatingChange = ({ target }) => {
        const value = parseInt(target.value)
        setSelectedRatings(prevState => target.checked ? [...prevState, value] : prevState.filter(rating => rating !== value))
    }

    const valueLabelFormat = (value, index) => {
        return index === 0 ? 'My location' : `${value}km`
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
                        <Box className='price-range-box filter-modal'>
                            <h6 className="price-range-title">Price Range Selected</h6>
                            <p>₪12 - ₪357</p>
                            <div className="slider-container">
                                <Slider
                                    className='price-slider'
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay='on'
                                    min={12}
                                    max={357}
                                />
                            </div>
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
                        <Box className='distance-box filter-modal'>
                            <h6 className="distance-title">Distance</h6>
                            <div className="slider-container">
                                <Slider
                                    className='distance-slider'
                                    value={distance}
                                    onChange={handleDistanceChange}
                                    valueLabelDisplay='on'
                                    max={4}
                                    valueLabelFormat={valueLabelFormat}
                                />
                            </div>
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
                        <Box className='rating-box filter-modal'>
                            <h6>Rating</h6>
                            <div className="rating-list">
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <FormControlLabel
                                        key={rating}
                                        control={
                                            <Checkbox
                                                checked={selectedRatings.includes(rating)}
                                                onChange={handleRatingChange}
                                                value={rating}
                                            />
                                        }
                                        label={utilService.renderStars(rating)}
                                    />
                                ))}
                            </div>
                        </Box>
                    </Modal>
                )}
            </div>
        </section>
    )
}