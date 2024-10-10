import { Chef } from "../../../types/chef.type"
import ChefPreview from "./chef-preview"

interface ChefListProps {
    chefs: Chef[]
    lastChefRef: React.MutableRefObject<HTMLLIElement | null>
}

export default function ChefList({ chefs, lastChefRef }: ChefListProps) {

    if (!chefs?.length) return <h1 className="no-chefs">No chefs found</h1>
    return (
        <section className="chef-list-container">
            <ul className="chef-list">
                {chefs.map((chef, idx) => (
                    <li key={chef._id} ref={idx === chefs.length - 1 ? lastChefRef : null}>
                        <ChefPreview chef={chef} />
                    </li>
                ))}
            </ul>
        </section>
    )
}