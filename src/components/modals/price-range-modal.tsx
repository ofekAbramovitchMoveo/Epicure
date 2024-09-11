import { Slider } from "@mui/material"

import FilterModal from "./filter-modal"

interface PriceRangeModalProps {
    isPriceModalOpen: boolean
    togglePriceModal: () => void
    priceContainerRef: React.RefObject<HTMLDivElement>
    priceModalHeight: string
    handleClearPrice: () => void
    priceSliderRef: React.RefObject<HTMLDivElement>
    priceRange: number[]
    handlePriceChange: (event: Event, newValue: number | number[]) => void
    getIsActiveClassMin: (ref: React.RefObject<HTMLDivElement>) => string
    getIsActiveClassMax: (ref: React.RefObject<HTMLDivElement>) => string
    isMobile: boolean
}

export default function PriceRangeModal({ isPriceModalOpen, togglePriceModal,
    priceContainerRef, priceModalHeight, handleClearPrice, priceSliderRef, priceRange,
    handlePriceChange, getIsActiveClassMin, getIsActiveClassMax, isMobile }: PriceRangeModalProps) {

    return (
        <FilterModal
            className='price-range-modal'
            open={isPriceModalOpen}
            onClose={togglePriceModal}
            aria-labelledby="price-range-modal-title"
            aria-describedby="price-range-modal-description"
            containerRef={priceContainerRef}
            boxClassName={`price-range-box filter-modal ${priceModalHeight === '197px' ? 'expanded' : ''}`}
            boxSx={{
                ...(isMobile && {
                    position: 'relative',
                    left: '38%',
                })
            }}
            height={priceModalHeight}
            handleClear={handleClearPrice}
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
        </FilterModal>
    )
}