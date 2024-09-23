import RestaurantFilterBtn from "./restaurant-filter-btn"

interface RestaurantFilterWrapperProps {
    filterName: string
    filterContainerRef: React.MutableRefObject<null>
    toggleFilterModal: () => void
    txt: string
    isModalOpen: boolean
    children: React.ReactNode
}

export default function RestaurantFilterWrapper({ filterName, filterContainerRef, toggleFilterModal, txt, isModalOpen, children }: RestaurantFilterWrapperProps) {
    return (
        <div className={`${filterName}-container`} ref={filterContainerRef}>
            <RestaurantFilterBtn className={filterName} onClick={toggleFilterModal}>{txt}</RestaurantFilterBtn>
            {isModalOpen && (
                children
            )}
        </div>
    )
}