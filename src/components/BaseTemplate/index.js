import React, {Component} from 'react';
import Media from 'react-media';
import {Navbar, Nav, NavItem, Glyphicon, Row,Col} from 'react-bootstrap';
import TaskList from '../TaskList';

// temporary for issue #10
import TaskCreationForm from '../TaskList/TaskCreationForm';

const NavBarOnBottom = props => {
  return(
    <Row className="mobile-navbar">
        <Col xs={7}>
            <Row>
                <Col onClick={() => props.handleNavButtonClick(1)} href="#" xs={4} className="mobile-item"><Glyphicon glyph="tasks" /></Col>
                <Col onClick={() => props.handleNavButtonClick(2)} href="#" xs={4} className="mobile-item"><Glyphicon glyph="usd" /></Col>
                <Col onClick={() => props.handleNavButtonClick(3)} href="#" xs={4} className="mobile-item"><Glyphicon glyph="calendar" /></Col>
            </Row>
        </Col>
        <Col xs={5}>
            <Row>
                <Col onClick={() => props.handleNavButtonClick(4)} href="#" xs={6} className="mobile-item"><Glyphicon glyph="comment" /></Col>
                <Col onClick={() => props.handleNavButtonClick(5)} href="#" xs={6} className="mobile-item"><Glyphicon glyph="cog" /></Col>
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
                <div> <Glyphicon glyph="comment" /> Messaging  </div>
            </NavItem>
            <NavItem onClick={() => props.handleNavButtonClick(5)} href="#">
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
        canvas = <TaskList />;
        break;
      case 2:
        canvas = <h1>Splitting</h1>;
        break;
      case 3:
        canvas = <h1>Calendar</h1>;
        break;
      case 4:
        canvas = <h1>Messaging</h1>;
        break;
      case 5:
        canvas = <h1>Settings</h1>;
        break;
      case 9:
        canvas = <TaskCreationForm />; // temporary testing tab
        break;
      default:
        canvas = <h1>Page Not Found.</h1>;
        break;
    }

    return(canvas);
  }
}

class BaseTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 9,
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
                  <div>
                    <Canvas activeTab={this.state.activeTab} />
                    <NavBarOnBottom handleNavButtonClick={(tab) => this.handleNavButtonClick(tab)} />
                  </div>
              ) : (
                  <div>
                      <NavBarOnTop handleNavButtonClick={(tab) => this.handleNavButtonClick(tab)} />
                      <Canvas activeTab={this.state.activeTab} />
                  </div>
              )
          }
      </Media>
    );
  }
}

export default BaseTemplate;
