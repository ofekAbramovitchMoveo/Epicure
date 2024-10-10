import { useSelector } from "react-redux"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import LocationOffIcon from '@mui/icons-material/LocationOff'

import { toggleLocationWarningPopup } from "../../store/restaurant/restaurant.actions"
import { RootState } from "../../store/store"

export default function LocationWarningDialog() {
    const isPopupOpen = useSelector((storeState: RootState) => storeState.restaurantModule.isLocationWarningPopupOpen)

    return (
        <Dialog
            className="warning-dialog"
            open={isPopupOpen}
            onClose={toggleLocationWarningPopup}
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
            <DialogContent className="dialog-box location">
                <LocationOffIcon className="location-icon" />
                <div className="txt-container location">
                    <h1 className="title location">ALLOW LOCATION</h1>
                    <p className="desc location">
                        Please allow location access to get the best experience
                    </p>
                </div>
                <div className="btns">
                    <button className="delete-btn btn" onClick={toggleLocationWarningPopup}>CONTINUE</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}