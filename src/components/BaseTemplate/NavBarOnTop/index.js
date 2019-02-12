import React from 'react';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';

const NavBarOnTop = props => {
  return(
    <Navbar inverse fixed="top">
    <Navbar.Header>
        <Navbar.Brand onClick={() => props.handleNavButtonClick(0)}>
          Homie
        </Navbar.Brand>
        <Navbar.Toggle />
    </Navbar.Header>
        <Nav>
            <NavItem onClick={() => props.handleNavButtonClick(1)} href="#">
                <div><Glyphicon glyph="tasks" /> Tasks </div>
            </NavItem>
            <NavItem onClick={() => props.handleNavButtonClick(2)} href="#">
                <div><Glyphicon glyph="usd" /> Payments </div>
            </NavItem>
            <NavItem onClick={() => props.handleNavButtonClick(3)} href="#">
                <div><Glyphicon glyph="calendar" /> Calendar </div>
            </NavItem>
            <NavItem onClick={() => props.handleNavButtonClick(4)} href="#">
                <div><Glyphicon glyph="cog" /> Settings </div>
            </NavItem>
        </Nav>
        <Nav pullRight>
          {props.user ?
          <NavItem onClick={() => props.handleLogOut()} href="#">
                <div><Glyphicon glyph="log-out" /> Log Out </div>
          </NavItem>
          :
          <NavItem onClick={() => props.handleLogIn()} href="#">
                <div><Glyphicon glyph="log-in" /> Log In </div>
          </NavItem>
          }
        </Nav>
    </Navbar>
  );
};

export default NavBarOnTop;
