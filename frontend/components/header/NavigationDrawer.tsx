import React from "react"
import {Link} from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Button from "../inputs/Button"

export default function NavigationDrawer() {

    return(<div className="navigation-nav-drawer">
        <Row className="navigation-nav-drawer-wrapper">
            <Col>
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
        </Row>
    </div>)
}