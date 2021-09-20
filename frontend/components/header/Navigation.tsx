import React from "react"
import {Link} from "react-router-dom"
import {SocialIcon} from "react-social-icons"
import {Telephone, Envelope, List} from "react-bootstrap-icons"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

import {UIContext} from "../../context/UIContext"

import Button from "../inputs/Button"
import LogoSvg from "../../imgs/LogoSvg"

import "../../styles/nav/navigation.scss"

export default function Navigation() {
    const {uiSize} = React.useContext(UIContext)
    const [size, setSize] =  uiSize

    let telephoneText = "(619) 123-9876"
    let telephoneNumber = "619-123-9876"

    let emailText = "Boop Our Inbox"
    let emailAddress = "not-an-email@dummy.me"

    let iconDim = 20;

    let isMobile = (size != "lg" && size != "xl" && size != "xxl")

    return(
        <nav className="navigation">
            <Container fluid>
                <Row className={`navigation-header${isMobile? " d-none" : ""}`}>
                    <Col className="navigation-header-contacts">
                        <div className="navigation-header-contact">
                            <a href={`tel:${telephoneNumber}`}>
                                <Telephone size={iconDim} />
                                <span>{telephoneText}</span>
                            </a>
                        </div>
                        <div className="navigation-header-contact">
                            
                            <a href={`mailto:${emailAddress}`}>
                                <Envelope size={iconDim} />
                                <span>{emailText}</span>
                            </a>
                        </div>
                    </Col>
                    <Col className="navigation-header-socials">
                        <SocialIcon url="https://www.facebook.com/" style={{height: iconDim, width: iconDim}} bgColor="#000" />
                        <SocialIcon url="https://twitter.com/" style={{height: iconDim, width: iconDim}} bgColor="#000" />
                        <SocialIcon url="https://www.instagram.com/" style={{height: iconDim, width: iconDim}} bgColor="#000" />
                        <SocialIcon url="https://www.snapchat.com/" style={{height: iconDim, width: iconDim}} bgColor="#000" />
                    </Col>
                </Row>
                <Row className="navigation-nav">
                    <Col md={4} sm={8} xs={8}>
                        <div className="navigation-nav-logo">
                            <a href="/">
                                <LogoSvg />
                            </a>
                        </div>
                    </Col>
                    <Col className={`navigation-nav-links${isMobile? " d-none" : ""}`}>
                        <ul>
                            <li><Link to="/browse">Browse Pets</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/volunteer">Volunteer</Link></li>
                            <li><Link to="/foster">Foster</Link></li>
                            <li><Link to="/donate">Donate</Link></li>
                            <li><Link to="/adopt">
                                <Button secondary>Adopt</Button>
                            </Link></li>
                        </ul>
                    </Col>
                    {isMobile && <Col className="navigation-mobile-toggle">
                        <List size={42}/>
                    </Col>}
                </Row>
            </Container>
        </nav>
    )
}