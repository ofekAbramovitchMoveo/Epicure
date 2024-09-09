import { Box, Dialog } from "@mui/material"

import question from '/imgs/question.svg'

interface WarningDialogProps {
    isPopupOpen: boolean
    onPopupClose: () => void
    onClearBag: () => void
}

export default function WarningDialog({ isPopupOpen, onPopupClose, onClearBag }: WarningDialogProps) {
    return (
        <Dialog
            className="warning-dialog"
            open={isPopupOpen}
            onClose={onPopupClose}
            aria-labelledby="warning-dialog-title"
            aria-describedby="warning-dialog-description"
            sx={{
                zIndex: 10000,
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    }
                }
            }}
        >
            <Box className="dialog-box">
                <img src={question} alt="" className="question" />
                <div className="txt-container">
                    <h1 className="title">DELETE ORDER?</h1>
                    <p className="desc">
                        You can order from only one restaurant per order.
                        Going out to another restaurant will erase all the items you put in the cart
                    </p>
                </div>
                <div className="btns">
                    <button className="delete-btn btn" onClick={onClearBag}>DELETE</button>
                    <button className="back-btn btn" onClick={onPopupClose}>BACK TO ORDER</button>
                </div>
            </Box>
        </Dialog>
    )
}