import React from 'react';
import {Glyphicon, Row, Col} from 'react-bootstrap';

const NavBarOnBottom = props => {
  return(
      <Row className="mobile-navbar">
        <Col onClick={() => props.handleNavButtonClick(1)} href="#" xs={3} className="mobile-item">
          <Row>
              <Glyphicon glyph="tasks" />
          </Row>
          <Row className="smallText">
            Tasks
          </Row>
        </Col>
        <Col onClick={() => props.handleNavButtonClick(2)} href="#" xs={3} className="mobile-item">
          <Row>
            <Glyphicon glyph="usd" />
          </Row>
          <Row className="smallText">
            Payments
          </Row>
        </Col>
        <Col onClick={() => props.handleNavButtonClick(3)} href="#" xs={3} className="mobile-item">
          <Row>
            <Glyphicon glyph="calendar" />
          </Row>
          <Row className="smallText">
            Calendar
          </Row>
        </Col>
        <Col onClick={() => props.handleNavButtonClick(4)} href="#" xs={3} className="mobile-item">
          <Row>
            <Glyphicon glyph="cog" />
          </Row>
          <Row className="smallText">
            Settings
          </Row>
        </Col>
      </Row>
  );
};

export default NavBarOnBottom;
