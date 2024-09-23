import { Chef } from "../../../types/chef.type"
import ChefPreview from "./chef-preview"

interface ChefListProps {
    chefs: Chef[]
}

export default function ChefList({ chefs }: ChefListProps) {

    if (!chefs?.length) return <h1 className="no-chefs">No chefs found</h1>
    return (
        <section className="chef-list-container">
            <ul className="chef-list">
                {chefs.map(chef => (
                    <li key={chef._id}>
                        <ChefPreview chef={chef} />
                    </li>
                ))}
            </ul>
        </section>
    )
}