import { useMediaQuery } from "react-responsive"

import Image from "./image"

export default function About() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <div className="about full main-layout">
            <div className="about-container">
                <div className="text-container">
                    <h1>ABOUT US:</h1>
                    <p className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum non
                        eu ipsum. Cras porta malesuada eros, eget blandit
                        turpis suscipit at.  Vestibulum sed massa in magna sodales porta.  Vivamus elit urna,
                        dignissim a vestibulum.
                        {!isMobile &&
                            <>
                                <br />
                                <br />
                            </>
                        }
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel justo fermentum bibendum no
                        eu ipsum. Cras porta malesuada eros.
                    </p>
                    <div className="btns">
                        <button className="app-store-btn">
                            <Image src="apple.svg" alt="" className="logo" />
                            <p>Download on the <br /> <span>App Store</span></p>
                        </button>
                        <button className="google-store-btn">
                            <Image src="google-play.svg" alt="" className="logo" />
                            <p>Get it on <br /> <span>Google Play</span></p>
                        </button>
                    </div>
                </div>
                <Image src="logo.svg" alt="" className="about-logo" />
            </div>
        </div>
    )
}