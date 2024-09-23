import { useState } from 'react'
import { useLocation } from 'react-router'
import { useMediaQuery } from 'react-responsive'

import { BagDish } from '../../../types/dish.type'
import Image from '../../image'
import BagDishInfo from './bag-dish-info'

interface BagDishPreviewProps {
    dish: BagDish
    onRemoveDish: (dishId: string) => void
}

export default function BagDishPreview({ dish, onRemoveDish }: BagDishPreviewProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()
    const isCheckoutPage = location.pathname.includes('/checkout')


    return (
        <section className="bag-dish-preview">
            <div className={`img-container ${isCheckoutPage ? 'checkout' : ''}`}>
                <Image src={dish.imgUrl || ''} alt="" className="dish-img" />
            </div>
            <BagDishInfo dish={dish}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                onRemoveDish={onRemoveDish}
                isMobile={isMobile}
            />
        </section>
    )
}