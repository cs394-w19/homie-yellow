import React from 'react';
import Media from 'react-media';
import {Navbar, Nav, NavItem, Glyphicon, Row,Col} from 'react-bootstrap';
import TaskList from '../TaskList';

const NavBarOnBottom = props => {
  return(
    <Row className="mobile-navbar">
        <Col xs={7}>
            <Row>
                <Col eventKey={1} href="#" xs={4} className="mobile-item"><Glyphicon glyph="tasks" /></Col>
                <Col eventKey={2} href="#" xs={4} className="mobile-item"><Glyphicon glyph="usd" /></Col>
                <Col eventKey={3} href="#" xs={4} className="mobile-item"><Glyphicon glyph="calendar" /></Col>
            </Row>
        </Col>
        <Col xs={5}>
            <Row>
                <Col eventKey={4} href="#" xs={6} className="mobile-item"><Glyphicon glyph="comment" /></Col>
                <Col eventKey={5} href="#" xs={6} className="mobile-item"><Glyphicon glyph="cog" /></Col>
            </Row>
        </Col>
    </Row>
  );
}

const NavBarOnTop = props => {
  return(
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
  );
}

const BaseTemplate = (props) => {
    return (
        <Media query="(max-width: 770px)">
            {matches => matches ?
                (
                    <div>
                      <TaskList />
                      <NavBarOnBottom />
                    </div>
                ) : (
                    <div>
                      <NavBarOnTop />
                      <TaskList />
                    </div>
                )
            }
        </Media>
    );
}

export default BaseTemplate;
