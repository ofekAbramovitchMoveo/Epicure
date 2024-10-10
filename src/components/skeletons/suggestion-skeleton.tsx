import Skeleton from '@mui/material/Skeleton'

export default function SuggestionSkeleton() {
    return (
        <div className="suggestion-skeleton">
            <Skeleton variant="rectangular" width="100%" height={20} />
        </div>
    )
}