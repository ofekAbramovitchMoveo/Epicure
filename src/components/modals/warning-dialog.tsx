import { useSelector } from "react-redux"
import { Dialog, DialogContent } from "@mui/material"

import { clearBag, setWarningPopup } from "../../store/restaurant/restaurant.actions"
import { RootState } from "../../store/store"

import question from '/imgs/question.svg'

interface WarningDialogProps {
    onClearBag: () => void
}

export default function WarningDialog({ onClearBag }: WarningDialogProps) {
    const isPopupOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isWarningPopupOpen)

    function onWarningPopupClose() {
        setWarningPopup(false)
    }

    return (
        <Dialog
            className="warning-dialog"
            open={isPopupOpen}
            onClose={onWarningPopupClose}
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
            <DialogContent className="dialog-box">
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
                    <button className="back-btn btn" onClick={onWarningPopupClose}>BACK TO ORDER</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}