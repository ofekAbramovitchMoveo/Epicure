import { useCallback, useEffect, useRef, useState } from "react"

interface PaginationResult<T> {
    items: T[];
    totalCount: number;
}

interface UseIntersectionObserverProps<T, F> {
    filterBy: F
    loadItems: (filterBy: F) => Promise<PaginationResult<T> | undefined>
}

const PAGE_SIZE = 6

export default function useIntersectionObserver<T, F>({ filterBy, loadItems }: UseIntersectionObserverProps<T, F>) {
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const observer = useRef<IntersectionObserver | null>(null)
    const targetRef = useRef<HTMLLIElement | null>(null)
    const hasMore = (page - 1) * PAGE_SIZE < totalItems

    const loadMore = useCallback(async () => {
        try {
            await loadItems({ ...filterBy, page })
            setPage(prevPage => prevPage + 1)
        } catch (error) {
            console.log('error loading more items', error)
        }
    }, [filterBy, page, loadItems])


    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore) {
            loadMore()
        }
    }

    useEffect(() => {
        const options = {
            root: null,
            threshold: 0.4
        }
        observer.current = new IntersectionObserver(handleObserver, options)

        if (targetRef.current) {
            observer.current.observe(targetRef.current)
        }

        return () => {
            if (targetRef.current) observer.current?.unobserve(targetRef.current)
            observer.current?.disconnect()
        }
    }, [handleObserver])

    return { targetRef, setPage, setTotalItems }
}