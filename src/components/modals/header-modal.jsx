/* eslint-disable react/prop-types */
import { Modal as MuiModal, Fade, Box } from '@mui/material'

export default function HeaderModal({ children, open, onClose, containerRef, className,
    ariaLabelledby, ariaDescribedby, sx, boxClassName,
    boxSx }) {
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
            slots={{ BackdropComponent: Fade }}
            slotProps={{
                backdrop: {
                    timeout: {
                        enter: 300,
                        exit: 0
                    },
                    easing: {
                        enter: 'ease-out',
                        exit: 'ease-out'
                    }
                }
            }}
            container={containerRef}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className={boxClassName} sx={boxSx}>
                    {children}
                </Box>
            </Fade>
        </MuiModal>
    )
}