import React from 'react';
import Media from 'react-media';
import {Navbar, Nav, NavItem, Glyphicon, Row,Col} from 'react-bootstrap';

const BaseTemplate = (props) => {
    return (
        <div>
            <Media query="(max-width: 770px)">
            {matches =>
                matches ? (
                    <Navbar inverse fixedBottom>
                        <Nav >
                            <NavItem eventKey={1} href="#"><Glyphicon glyph="tasks"/></NavItem>
                            <NavItem eventKey={2} href="#"><Glyphicon glyph="usd" /></NavItem>
                            <NavItem eventKey={3} href="#"><Glyphicon glyph="calendar" /></NavItem>
                            <NavItem eventKey={4} href="#"><Glyphicon glyph="comment" /></NavItem>
                            <NavItem eventKey={5} href="#"><Glyphicon glyph="cog" /></NavItem>
                        </Nav>
                    </Navbar>
                ) : (
                    <Navbar inverse fixed="top">
                    <Navbar.Header>
                        <Navbar.Brand>
                        <a href="#brand">Homie</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                <div><Glyphicon glyph="tasks" /> Tasks </div> 
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                <div><Glyphicon glyph="usd" /> Splitting </div>
                            </NavItem>
                            <NavItem eventKey={3} href="#">
                                <div><Glyphicon glyph="calendar" /> Calendar </div>
                            </NavItem>
                            <NavItem eventKey={4} href="#">
                                <div> <Glyphicon glyph="comment" /> Messaging  </div>
                            </NavItem>
                            <NavItem eventKey={5} href="#">
                                <div><Glyphicon glyph="cog" /> Settings </div>
                            </NavItem>
                        </Nav>
                    </Navbar>
                )
            }
            </Media>
        </div>
        
    );
}

export default BaseTemplate;