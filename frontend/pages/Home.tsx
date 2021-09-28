import React from "react"
import {Link} from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import {UIContext} from "../context/UIContext"

import Button from "../components/inputs/Button"

import BigLogo from "../imgs/BigLogo"

import "../styles/pages/home/home.scss"

export default function Home() {

    const {uiSize} = React.useContext(UIContext)
    const size =  uiSize[0]

    let isMobile = (size != "lg" && size != "xl" && size != "xxl");

    return(
        <Col sm={12} className="home" id="home">            
            <Row className={`home-hero${ isMobile? " home-hero--mobile" : "" }`}>
                <Col sm={12} className="home-hero-overlay"></Col>
                <Col sm={6} xs={11} className="home-hero-panel">

                    <Row className="home-hero-panel-buttons">
                        <Col lg={12} sm={12}>
                            <div className="home-hero-panel-buttons-wrapper">
                                <Link to="/adopt"><Button className="hero-button">Adopt</Button></Link>
                                <Link to="/foster"><Button className="hero-button" outlined>Foster</Button></Link>
                            </div>
                        </Col>
                    </Row>

                    <Row className="home-hero-panel-tagline-minor">
                        <Col lg={12} sm={12}>
                            <span>Dogs, puppies, cats, and kittens are available for adoption and foster care!</span>
                        </Col>
                    </Row>

                    <Row className="home-hero-panel-tagline-major">
                        <Col lg={12} sm={12}>
                            <span>Bring your new <b>furry friend</b> home.</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        
            <Row className="home-spiel-panel">
                <Col className="home-spiel-panel-wrapper">
                    <div className="home-spiel-logo">
                        <BigLogo />
                    </div>
                    <div className="home-spiel-body">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </Col>
            </Row>
        </Col>
    )
}