/* eslint-disable react/prop-types */
import { useMediaQuery } from 'react-responsive'
import trash from '/imgs/trash.svg'
import { useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { updateDishQuantity } from '../store/restaurant/restaurant.actions'

export default function BagDishPreview({ dish, onRemoveDish }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const onQuantityClick = () => {
        if (!isMobile && !isExpanded) {
            setIsExpanded(true)
        }
    }

    const onFieldClick = () => {
        if (!isMobile && isExpanded) {
            setIsExpanded(false)
        }
    }

    function handleQuantityChange(change) {
        const newQuantity = Math.max(1, dish.quantity + change)
        updateDishQuantity(dish.id, newQuantity)
    }

    return (
        <section className="bag-dish-preview">
            <div className="img-container">
                <img src={dish.imgUrl} alt="" className="dish-img" />
            </div>
            <div className={`dish-info ${isExpanded ? 'expanded' : ''}`}>
                <div className="dish-details">
                    <div className="dish-metadata">
                        <div className={`quantity ${isExpanded ? 'expanded' : 'clickable'}`}
                            onClick={onQuantityClick}
                        >
                            {isExpanded && !isMobile ? (
                                <>
                                    <IconButton className="minus btn" disabled={dish.quantity === 1}
                                        onClick={() => handleQuantityChange(-1)}>
                                        <Remove />
                                    </IconButton>
                                    <TextField
                                        onClick={onFieldClick}
                                        className='quantity-display'
                                        type="number"
                                        value={dish.quantity}
                                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                        sx={{
                                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                WebkitAppearance: 'none',
                                            }
                                        }}
                                    />
                                    <IconButton className="plus btn" onClick={() => handleQuantityChange(1)}>
                                        <Add />
                                    </IconButton>
                                    <img src={trash} alt="" onClick={() => onRemoveDish(dish.id)} className="trash-icon" />
                                </>
                            ) : (
                                dish.quantity
                            )}
                            {isMobile ? ' x' : ''}
                        </div>
                        <div className="container">
                            <h3 className="dish-name">{dish.name}</h3>
                            <p>₪{dish.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className={`dish-options-order ${isExpanded && !isMobile ? 'expanded' : ''}`}>
                        <p>{dish.sideDish} | {dish.changes.length ? dish.changes.join(', ') : 'No changes'}</p>
                    </div>
                </div>
                <span className="price">₪{dish.price}</span>
            </div>
        </section>
    )
}