import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"

import ChefPageLinks from "../components/chef/chef-page-links"
import ChefList from "../components/chef/chef-list"
import { RootState } from "../store/store"
import { loadChefs } from "../store/chef/chef.actions"

export default function ChefPage() {
    const chefs = useSelector((storeState: RootState) => storeState.chefModule.chefs)
    const [chefFilterBy, setChefFilterBy] = useState({ path: '' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        async function fetchData() {
            try {
                await loadChefs(chefFilterBy)
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
            <ChefList chefs={chefs} />
        </section>
    )
}