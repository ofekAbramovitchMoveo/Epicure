import { Chef } from "../types/chef.type"
import { Restaurant } from "../types/restaurant.type"
import ChefPreview from "./chef/components/chef-preview"
import Image from "./image"
import RestaurantList from "./restaurant/components/restaurant-list"

interface ChefOfTheWeekProps {
    chefs: Chef[]
    restaurants: Restaurant[]
}

export default function ChefOfTheWeek({ chefs, restaurants }: ChefOfTheWeekProps) {

    function getChefOfTheWeek() {
        if (!chefs || !chefs.length) return
        return chefs.find(chef => chef.isChefOfTheWeek)
    }

    function getChefOfTheWeekRestaurants() {
        if (!restaurants || !restaurants.length) return []
        return restaurants.filter(restaurant => restaurant.chefId === getChefOfTheWeek()?._id)
    }

    return (
        <article className="chef-container">
            <h1>CHEF OF THE WEEK:</h1>
            <div className="chef-info">
                <ChefPreview chef={getChefOfTheWeek() as Chef} />
                <p>Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit{`'`}s creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.</p>
            </div>
            <RestaurantList restaurants={getChefOfTheWeekRestaurants()} isChefRestaurants={true} chefId={getChefOfTheWeek()?._id} />
        </article>
    )
}