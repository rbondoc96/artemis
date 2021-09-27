import React from "react"
import {Link} from "react-router-dom"
import {SocialIcon} from "react-social-icons"
import {Telephone, Envelope, List, ArrowBarRight, XLg} from "react-bootstrap-icons"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import {UIContext} from "../../context/UIContext"

import NavigationDrawer from "./NavigationDrawer"
import Button from "../inputs/Button"
import LogoSvg from "../../imgs/LogoSvg"

import "../../styles/nav/navigation.scss"

export default function Navigation() {
    const {uiSize} = React.useContext(UIContext)
    const [size, setSize] =  uiSize

    const [drawerOpen, toggleDrawer] = React.useState(false)
    const drawerRef = React.useRef(null)

    let telephoneText = "(619) 123-9876"
    let telephoneNumber = "619-123-9876"

    let emailText = "Boop Our Inbox"
    let emailAddress = "not-an-email@dummy.me"

    let iconDim = 20

    let isMobile = (size != "lg" && size != "xl" && size != "xxl")


    const hamburgerMenuClick = (event: React.MouseEvent) => {
        if(drawerOpen) {
            window.gsap.to(".navigation-nav-drawer", {
                duration: 0.3,
                x: 300
            })
        } else {
            window.gsap.to(".navigation-nav-drawer", {
                duration: 0.3,
                x: 0
            })
        }

        toggleDrawer(!drawerOpen)
    }

    React.useEffect(() => {
        if(!isMobile) {
            toggleDrawer(false);
        } 
        window.gsap.to(".navigation-nav-drawer", {
            duration: 0,
            x: 300
        })
    }, [size])

    return(
        <nav className="navigation">
            <Col sm={12}>
                {!isMobile && <Row className="navigation-header">
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
                </Row>}
                
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
                        <List size={42} onClick={hamburgerMenuClick} />
                    </Col>}
                </Row>
                
                <div className="navigation-nav-drawer" ref={drawerRef}>
                    <Row className="navigation-nav-drawer-wrapper">
                        <Col>
                            <div className="navigation-nav-drawer-toggle">
                                <XLg size={25} onClick={hamburgerMenuClick} />
                            </div>

                            <div className="navigation-nav-drawer-contacts">
                                <div className="navigation-nav-drawer-contact">
                                    <a href={`tel:${telephoneNumber}`}>
                                        <Telephone size={iconDim} />
                                        <span>{telephoneText}</span>
                                    </a>
                                </div>
                                <div className="navigation-nav-drawer-contact">
                                    
                                    <a href={`mailto:${emailAddress}`}>
                                        <Envelope size={iconDim} />
                                        <span>{emailText}</span>
                                    </a>
                                </div>
                            </div>

                            <div className="navigation-nav-drawer-socials">
                                <SocialIcon url="https://www.facebook.com/" style={{height: (iconDim*2), width: (iconDim*2)}} bgColor="#000" />
                                <SocialIcon url="https://twitter.com/" style={{height: (iconDim*2), width: (iconDim*2)}} bgColor="#000" />
                                <SocialIcon url="https://www.instagram.com/" style={{height: (iconDim*2), width: (iconDim*2)}} bgColor="#000" />
                                <SocialIcon url="https://www.snapchat.com/" style={{height: (iconDim*2), width: (iconDim*2)}} bgColor="#000" />
                            </div>

                            <ul className="navigation-nav-drawer-links">
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
                    </Row>
                </div>
            </Col>
        </nav>
    )
}