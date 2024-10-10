import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Box from "@mui/material/Box"

interface HeaderModalProps {
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
}

export default function HeaderModal({ children, open = false, onClose, containerRef, className,
    ariaLabelledby, ariaDescribedby, sx, boxClassName,
    boxSx }: HeaderModalProps) {

    return (
        <Modal
            className={className}
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            disableEnforceFocus
            disableAutoFocus
            sx={{ ...sx, bottom: 'auto' }}
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
            container={containerRef?.current}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className={boxClassName} sx={boxSx}>
                    {children}
                </Box>
            </Fade>
        </Modal>
    )
}