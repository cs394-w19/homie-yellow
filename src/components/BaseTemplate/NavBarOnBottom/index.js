import React from 'react';
import {Glyphicon, Row, Col} from 'react-bootstrap';

const NavBarOnBottom = props => {
  return(
      <Row className="mobile-navbar">
          <Col xs={6}>
              <Row>
                  <Col onClick={() => props.handleNavButtonClick(1)} href="#" xs={6} className="mobile-item">
                    <Row>
                      <Col xs={12} >
                        <Glyphicon glyph="tasks" />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}className="smallText">
                        Tasks
                      </Col>
                    </Row>
                    </Col>
                  <Col onClick={() => props.handleNavButtonClick(2)} href="#" xs={6} className="mobile-item">
                  <Row>
                      <Col xs={12} >
                        <Glyphicon glyph="usd" />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}className="smallText">
                        Payments
                      </Col>
                    </Row>
                  </Col>
              </Row>
          </Col>
          <Col xs={6}>
              <Row>
                  <Col onClick={() => props.handleNavButtonClick(3)} href="#" xs={6} className="mobile-item">
                  <Row>
                      <Col xs={12} >
                        <Glyphicon glyph="calendar" />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}className="smallText">
                        Calendar
                      </Col>
                    </Row>
                  </Col>
                  <Col onClick={() => props.handleNavButtonClick(4)} href="#" xs={6} className="mobile-item">
                  <Row>
                      <Col xs={12} >
                        <Glyphicon glyph="cog" />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}className="smallText">
                        Settings
                      </Col>
                    </Row>
                  </Col>
              </Row>
          </Col>
      </Row>
  );
};

export default NavBarOnBottom;
