import Image from "./image"

export default function Icons() {
    return (
        <div className="icon-meaning full">
            <h1>THE MEANING OF OUR ICONS:</h1>
            <ul className="icon-list">
                <li>
                    <Image src="spicy.svg" alt="" />
                    <p>Spicy</p>
                </li>
                <li>
                    <Image src="vegitarian.svg" alt="" />
                    <p>Vegitarian</p>
                </li>
                <li>
                    <Image src="vegan.svg" alt="" />
                    <p>Vegan</p>
                </li>
            </ul>
        </div>
    )
}