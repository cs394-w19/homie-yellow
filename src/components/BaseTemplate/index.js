import React, {Component} from 'react';
import Media from 'react-media';
import {Navbar, Nav, NavItem, Glyphicon, Row, Col, Grid, Button} from 'react-bootstrap';
import TaskList from '../TaskList';
import Calendar from '../Calendar';
import Settings from '../Settings';
import firebase from 'firebase';
var provider = new firebase.auth.GoogleAuthProvider();

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
}

class Canvas extends Component {
  render() {
    let canvas = <h1>Page Not Found.</h1>;
    console.log(this.props);
    if(this.props.user == null) {
      return(<h1>Please log in</h1>);
    }

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
        canvas = <Calendar/>;
        break;
      case 4:
        canvas = <Settings 
                    user={this.props.user} 
                    handleLogOut={() => this.props.handleLogOut()}/>;
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
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  handleNavButtonClick(tab) {
    this.setState({
      activeTab: tab,
    });
  }

  handleLogIn() {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  handleLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null
        });
    });
  }

  render() {
    if(this.state.user == null) {
      return(
        <Grid>
            <Row>
              <Button onClick={() => this.handleLogIn()}>Log In </Button>
            </Row>
        </Grid>
      );
    }
    return (
      <Media query="(max-width: 770px)">
          {matches => matches ?
              (
                  <Grid >
                      <Canvas 
                            database={this.props.database} 
                            taskList={this.props.taskList} 
                            activeTab={this.state.activeTab} 
                            handleLogOut={() => this.handleLogOut()}
                            user={this.state.user}/>
                      <NavBarOnBottom 
                            handleNavButtonClick={(tab) => this.handleNavButtonClick(tab)} 
                            handleLogOut={() => this.handleLogOut()}
                            user={this.state.user}/>
                  </Grid>
              ) : (
                  <div>
                      <NavBarOnTop 
                          handleNavButtonClick={(tab) => this.handleNavButtonClick(tab)} 
                          handleLogOut={() => this.handleLogOut()}
                          user={this.state.user}/>
                      <Canvas 
                          database={this.props.database} 
                          taskList={this.props.taskList} 
                          activeTab={this.state.activeTab} 
                          handleLogOut={() => this.handleLogOut()}
                          user={this.state.user}/>
                  </div>
              )
          }
      </Media>
    );
  }
}

export default BaseTemplate;
