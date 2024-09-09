import { Modal as MuiModal, Box } from '@mui/material'

interface FilterModalProps {
    children?: React.ReactNode
    open?: boolean
    onClose?: () => void
    containerRef?: React.RefObject<HTMLDivElement>
    className?: string
    ariaLabelledby?: string
    ariaDescribedby?: string
    sx?: React.CSSProperties
    boxClassName?: string
    boxSx?: React.CSSProperties
    height?: string
    handleClear?: () => void
}

export default function FilterModal({ children, open = false, onClose, containerRef, className,
    ariaLabelledby, ariaDescribedby, sx, boxClassName, boxSx, height, handleClear }: FilterModalProps) {
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
            container={containerRef?.current}
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