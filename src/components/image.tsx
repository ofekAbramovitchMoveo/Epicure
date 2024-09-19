interface ImageProps {
    src: string
    alt?: string
    className?: string
    onClick?: () => void
}

export default function Image({ src, alt, className, onClick }: ImageProps) {
    return <img src={`${import.meta.env.VITE_CLOUD_FRONT_URL}/public/imgs/${src}`} alt={alt}
        className={className}
        onClick={onClick}
    />
}