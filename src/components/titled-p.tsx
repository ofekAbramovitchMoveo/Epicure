interface TitledPProps {
    title: string
    children: React.ReactNode
    className?: string
}

export default function TitledP({ title, children, className }: TitledPProps) {

    return (
        <p title={title} className={className}>{children}</p>
    )
}