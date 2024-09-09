import { Skeleton } from "@mui/material"
import { styled } from '@mui/system'

const SkeletonContainer = styled('div')({
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
})

export default function RestaurantDetailsSkeleton() {
    return (
        <SkeletonContainer className="restaurant-details-skeleton">
            <Skeleton className="img-skeleton" variant="rectangular" width='100%' />
            <Skeleton width={148} height={64.5} />
            <Skeleton width={188} height={37} />
            <Skeleton width={123} height={20} />
            <Skeleton width={340} height={29} />
            <div className="dishes-skeleton">
                <Skeleton variant="rectangular" width={276} height={425} />
                <Skeleton variant="rectangular" width={276} height={425} />
                <Skeleton variant="rectangular" width={276} height={425} />
                <Skeleton variant="rectangular" width={276} height={425} />
            </div>
        </SkeletonContainer>
    )
}