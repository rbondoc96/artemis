import React from "react"

import PrimaryPaw from "./PrimaryPawSvg"
import SecondaryPaw from "./SecondaryPawSvg"

export default function BigLogo() {

    return(<div className="biglogo">
        <span className="biglogo-text">Adopt</span>
        <span className="biglogo-paw"><PrimaryPaw/></span>
        <span className="biglogo-text">A</span>
        <span className="biglogo-paw"><SecondaryPaw/></span>
        <span className="biglogo-text">Paw</span>
    </div>)
}