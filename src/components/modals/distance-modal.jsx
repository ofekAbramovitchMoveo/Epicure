/* eslint-disable react/prop-types */
import { Slider } from "@mui/material"

import FilterModal from "./filter-modal"

export default function DistanceModal({ isDistanceModalOpen, toggleDistanceModal,
    distanceContainerRef, distanceModalHeight, handleClearDistance, distanceSliderRef,
    distance, handleDistanceChange, getIsActiveClassMax, valueLabelFormat, isMobile }) {

    return (
        <FilterModal className='distance-modal'
            open={isDistanceModalOpen}
            onClose={toggleDistanceModal}
            aria-labelledby="distance-modal-title"
            aria-describedby="distance-modal-description"
            containerRef={distanceContainerRef.current}
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