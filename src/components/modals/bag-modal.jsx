/* eslint-disable react/prop-types */
import ShoppingBag from "../shopping-bag"
import HeaderModal from "./header-modal"

export default function BagModal({ bag, toggleBag, isBagOpen, isMobile }) {
    return (
        <HeaderModal open={isBagOpen}
            onClose={toggleBag}
            aria-labelledby={"shopping-bag-modal"}
            aria-describedby={"shopping-bag-description"}
            boxClassName={`bag-modal ${isMobile ? 'main-layout' : ''}`}
            boxSx={{
                padding: isMobile && bag.length ? '16px 0 24px' : (bag.length ? '27px 0 37px' : ''),
                justifyContent: bag.length ? 'inherit' : 'center',
                position: 'absolute',
                right: '0',
                height: isMobile ? (bag.length ? '514px' : '218px') : (!bag || !bag.length ? '586px' : '779px')
            }}
        >
            <ShoppingBag bag={bag} toggleBag={toggleBag} />
        </HeaderModal>
    )
}