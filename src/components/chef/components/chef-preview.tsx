import { Chef } from "../../../types/chef.type"
import Image from "../../image"

interface ChefPreviewProps {
    chef: Chef
}

export default function ChefPreview({ chef }: ChefPreviewProps) {
    return (
        <section className="chef-preview">
            <Image src={chef?.imgUrl} alt={chef?.name} className="chef-img" />
            <div className="name-overlay">
                <h3>{chef?.name}</h3>
            </div>
        </section>
    )
}