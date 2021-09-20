import React from "react"

import Container from "react-bootstrap/Container"

import {UIContext} from "../context/UIContext"

import HeroPhoto_1 from "../public/imgs/cat-and-dog-1.jpeg"

import "../styles/pages/home.scss"

export default function Home() {

    const {uiSize} = React.useContext(UIContext)
    const [size, setSize] =  uiSize

    return(
        <div className="home" id="home">            
            <Container fluid className="home-container">
                <div className="home-hero">
                    <div className="home-hero-photo">
                        <div className="home-hero-overlay"></div>
                        <img src={HeroPhoto_1} />
                    </div>
                </div>
            </Container>
        </div>
    )
}