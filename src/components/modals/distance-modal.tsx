import { Slider } from "@mui/material"

import FilterModal from "./filter-modal"

interface DistanceModalProps {
    isDistanceModalOpen: boolean
    toggleDistanceModal: () => void
    distanceContainerRef: React.RefObject<HTMLDivElement>
    distanceModalHeight: string
    handleClearDistance: () => void
    distanceSliderRef: React.RefObject<HTMLDivElement>
    distance: number[]
    handleDistanceChange: (event: Event, newValue: number | number[]) => void
    getIsActiveClassMax: (ref: React.RefObject<HTMLDivElement>) => string
    valueLabelFormat: (value: number, index: number) => string
    isMobile: boolean
}

export default function DistanceModal({ isDistanceModalOpen, toggleDistanceModal,
    distanceContainerRef, distanceModalHeight, handleClearDistance, distanceSliderRef,
    distance, handleDistanceChange, getIsActiveClassMax, valueLabelFormat, isMobile }: DistanceModalProps) {

    return (
        <FilterModal className='distance-modal'
            open={isDistanceModalOpen}
            onClose={toggleDistanceModal}
            aria-labelledby="distance-modal-title"
            aria-describedby="distance-modal-description"
            containerRef={distanceContainerRef}
            boxClassName={`distance-box filter-modal ${distanceModalHeight === '167px' ? 'expanded' : ''}`}
            boxSx={{
                ...(isMobile && {
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-49%)'
                })
            }}
            height={distanceModalHeight}
            handleClear={handleClearDistance}
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
        </FilterModal>
    )
}