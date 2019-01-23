import React, {Component} from 'react';
import Media from 'react-media';
import {Navbar, Nav, NavItem, Glyphicon, Row, Col, Grid} from 'react-bootstrap';
import TaskList from '../TaskList';

const NavBarOnBottom = props => {
  return(
      <Row className="mobile-navbar">
          <Col xs={6}>
              <Row>
                  <Col onClick={() => props.handleNavButtonClick(1)} href="#" xs={6} className="mobile-item"><Glyphicon glyph="tasks" /></Col>
                  <Col onClick={() => props.handleNavButtonClick(2)} href="#" xs={6} className="mobile-item"><Glyphicon glyph="usd" /></Col>
              </Row>
          </Col>
          <Col xs={6}>
              <Row>
                  <Col onClick={() => props.handleNavButtonClick(3)} href="#" xs={6} className="mobile-item"><Glyphicon glyph="calendar" /></Col>
                  <Col onClick={() => props.handleNavButtonClick(4)} href="#" xs={6} className="mobile-item"><Glyphicon glyph="cog" /></Col>
              </Row>
          </Col>
      </Row>
  );
}

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
                <div><Glyphicon glyph="usd" /> Splitting </div>
            </NavItem>
            <NavItem onClick={() => props.handleNavButtonClick(3)} href="#">
                <div><Glyphicon glyph="calendar" /> Calendar </div>
            </NavItem>
            <NavItem onClick={() => props.handleNavButtonClick(4)} href="#">
                <div><Glyphicon glyph="cog" /> Settings </div>
            </NavItem>
        </Nav>
    </Navbar>
  );
}

class Canvas extends Component {
  render() {
    let canvas = <h1>Page Not Found.</h1>;

    switch (this.props.activeTab) {
      case 0:
        canvas = <h1>Welcome to Homie</h1>;
        break;
      case 1:
        canvas = <TaskList database={this.props.database} taskList={this.props.taskList} />;
        break;
      case 2:
        canvas = <h1>Splitting</h1>;
        break;
      case 3:
        canvas = <h1>Calendar</h1>;
        break;
      case 4:
        canvas = <h1>Settings</h1>;
        break;
      default:
        canvas = <h1>Page Not Found.</h1>;
    }

    return(canvas);
  }
}

class BaseTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
    };
  }

  handleNavButtonClick(tab) {
    this.setState({
      activeTab: tab,
    });
  }


  render() {
    return (
      <Media query="(max-width: 770px)">
          {matches => matches ?
              (
                <Grid >
                    <Canvas database={this.props.database} taskList={this.props.taskList} activeTab={this.state.activeTab} />
                    <NavBarOnBottom handleNavButtonClick={(tab) => this.handleNavButtonClick(tab)} />
                </Grid>
              ) : (
                  <div>
                      <NavBarOnTop handleNavButtonClick={(tab) => this.handleNavButtonClick(tab)} />
                      <Canvas database={this.props.database} taskList={this.props.taskList} activeTab={this.state.activeTab} />
                  </div>
              )
          }
      </Media>
    );
  }
}

export default BaseTemplate;
