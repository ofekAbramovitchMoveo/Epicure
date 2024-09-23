import Image from "../../image"

interface RestaurantFilterBtnProps {
    className: string
    onClick: () => void
    children: React.ReactNode
}

export default function RestaurantFilterBtn({ className, onClick, children }: RestaurantFilterBtnProps) {
    return (
        <button className={`${className} filter-btn`} onClick={onClick}>{children} <Image src="arrow-down.svg" alt="" /></button>
    )
}