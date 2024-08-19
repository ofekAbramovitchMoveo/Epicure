/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'


export default function DishOrder({ dish, toggleModal, isModalOpen }) {

    return (
        <Modal
            className="dish-order-modal"
            open={isModalOpen}
            onClose={toggleModal}
            aria-labelledby="dish-order-title"
            aria-describedby="dish-order-description"
            sx={{ bottom: 'auto', top: '0' }}
        >
            <Box className="dish-order-box" sx={{ position: 'relative' }}>
                <CloseIcon onClick={toggleModal} className="close-icon" />
                <img src={dish.imgUrl} alt="" />
                <h1>{dish.name}</h1>
                <p>{dish.ingredients?.join(', ')}</p>
                <img src={dish.iconUrl} alt="" />
                <div className="price-container">
                    <hr className="line" />
                    <span className="price">₪{dish.price}</span>
                    <hr className="line" />
                </div>
            </Box>
        </Modal>
    )
}