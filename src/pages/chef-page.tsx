import { useMediaQuery } from "react-responsive"

import { Chef } from "../types/chef.type"
import ChefPageLinks from "../components/chef/chef-page-links"
import ChefList from "../components/chef/chef-list"

interface ChefPageProps {
    chefs: Chef[]
    setChefFilterBy: (updater: (prevState: { path: string }) => { path: string }) => void
}

export default function ChefPage({ chefs, setChefFilterBy }: ChefPageProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
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