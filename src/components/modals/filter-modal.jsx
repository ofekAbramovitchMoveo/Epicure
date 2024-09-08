/* eslint-disable react/prop-types */
import { Modal as MuiModal, Box } from '@mui/material'

export default function FilterModal({ children, open, onClose, containerRef, className,
    ariaLabelledby, ariaDescribedby, sx, boxClassName, boxSx, height, handleClear }) {
    return (
        <MuiModal
            className={className}
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            disableScrollLock
            disableEnforceFocus
            disableAutoFocus
            sx={{ ...sx, bottom: 'auto' }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        position: 'fixed',
                        top: '232.5px'
                    }
                }
            }}
            container={containerRef}
        >
            <Box className={boxClassName} sx={{
                ...boxSx,
                height,
                transition: 'height 0.4s linear'
            }}>
                {children}
                <button className="clear-btn" onClick={handleClear}>CLEAR</button>
            </Box>
        </MuiModal>
    )
}