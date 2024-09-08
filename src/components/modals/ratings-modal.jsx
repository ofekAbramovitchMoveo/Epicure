/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from "@mui/material"

import { utilService } from "../../services/util.service"
import FilterModal from "./filter-modal"

export default function RatingsModal({ isRatingModalOpen, toggleRatingModal, ratingContainerRef,
    ratingModalHeight, handleClearRating, selectedRatings, handleRatingChange, isMobile }) {

    return (
        <FilterModal className='rating-modal'
            open={isRatingModalOpen}
            onClose={toggleRatingModal}
            aria-labelledby="rating-modal-title"
            aria-describedby="rating-modal-description"
            containerRef={ratingContainerRef.current}
            boxClassName={`rating-box filter-modal ${ratingModalHeight === '368px' ? 'expanded' : ''}`}
            boxSx={{
                ...(isMobile && {
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-79%)'
                })
            }}
            height={ratingModalHeight}
            handleClear={handleClearRating}
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
        </FilterModal>
    )
}