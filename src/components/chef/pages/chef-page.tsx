import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import ChefPageLinks from "../components/chef-page-links"
import ChefList from "../components/chef-list"
import { RootState } from "../../../store/store"
import { loadChefs } from "../../../store/chef/chef.actions"
import useIntersectionObserver from "../../../custom-hooks/use-intersection-observer"

export default function ChefPage() {
    const chefs = useSelector((storeState: RootState) => storeState.chefModule.chefs)
    const [chefFilterBy, setChefFilterBy] = useState<{ sortBy: string | null, limit: string | null, page: number }>({ sortBy: '', limit: '', page: 1 })
    const { targetRef, setPage, setTotalItems } = useIntersectionObserver({ filterBy: chefFilterBy, loadItems: loadChefs })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        setPage(1)

        async function fetchData() {
            try {
                const res = await loadChefs({ ...chefFilterBy, page: 1 })
                setTotalItems(res?.totalCount || 0)
            } catch (error) {
                console.log('error loading chefs', error)
            }
        }
        fetchData()
    }, [chefFilterBy])

    return (
        <section className="chef-page main-layout full">
            {isMobile && (
                <h1 className="title">CHEFS</h1>
            )}
            <ChefPageLinks setChefFilterBy={setChefFilterBy} />
            <ChefList chefs={chefs} lastChefRef={targetRef} />
        </section>
    )
}