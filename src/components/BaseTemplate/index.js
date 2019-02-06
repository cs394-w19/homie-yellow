import React, {Component} from 'react';
import Media from 'react-media';
import {Navbar, Nav, NavItem, Glyphicon, Row, Col, Grid, Button, Image} from 'react-bootstrap';
import TaskList from '../TaskList';
import Calendar from '../Calendar';
import Settings from '../Settings';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
                        Splitting
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
  constructor(props) {
    super(props);
    this.state = {
      personsInGroup: [],
    };
    // get user data from database
    var currUser = this.props.user; // currUser.uid
    let users = this.props.database.ref('users');
    users.on('value', data => {
        var persons = [];
        var groupID = null;
        data.forEach(child => {
            persons.push(child.val());
            if (child.val().uid === currUser.uid)
              groupID = child.val().groupID;
        });
        if (groupID === null) {
          // create new user because they are new
          this.handleCreateNewUser(currUser);
        }
        var personsInGroup = persons.filter(person => {
          return person.groupID === groupID;
        });
        this.setState({
            personsInGroup: personsInGroup,
        });
    });
  }

  handleCreateNewUser(user) {
    let newUser = {
      birthday: "1/1/1971",
      groupID: 0,
      name: user.displayName.split(" ")[0],
      uid: user.uid
    };
    let updates = {};
    updates['/users/' + user.uid] = newUser;
    this.props.database.ref().update(updates);
  }

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
        canvas = <TaskList
                    user={this.props.user}
                    personsInGroup={this.state.personsInGroup}
                    database={this.props.database}
                    taskList={this.props.taskList}
                  />;
        break;
      case 2:
        canvas = <h1>Splitting</h1>;
        break;
      case 3:
        canvas = <Calendar 
                    user={this.props.user}
                    personsInGroup={this.state.personsInGroup}
                    database={this.props.database} 
                    taskList={this.props.taskList}
                    />;
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

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {this.setState({activeTab: 1})}
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
        });
      }
    });
  }

  handleNavButtonClick(tab) {
    this.setState({
      activeTab: tab,
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
            <Row id="Login" className="align-middle">
              <h2> Welcome to Homie!</h2>
             <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
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
