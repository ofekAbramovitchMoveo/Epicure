import { Skeleton } from "@mui/material"
import { styled } from '@mui/system'

const SkeletonContainer = styled('div')({
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
})

export default function RestaurantDetailsSkeleton() {
    return (
        <SkeletonContainer>
            <Skeleton variant="rectangular" width='100%' height={425} />
            <Skeleton width={148} height={64.5} />
            <Skeleton width={188} height={37} />
            <Skeleton width={123} height={20} />
            <Skeleton width={340} height={29} />
            <div style={{ display: 'flex', gap: '32px', marginTop: '40px', width: '100%' }}>
                <Skeleton variant="rectangular" width={276} height={425} />
                <Skeleton variant="rectangular" width={276} height={425} />
                <Skeleton variant="rectangular" width={276} height={425} />
                <Skeleton variant="rectangular" width={276} height={425} />
            </div>
        </SkeletonContainer>
    )
}