import React, {Component} from 'react';
import Media from 'react-media';
import {Row, Grid} from 'react-bootstrap';
import Canvas from './Canvas';
import JoinScreen from '../JoinScreen';
import NavBarOnTop from './NavBarOnTop';
import NavBarOnBottom from './NavBarOnBottom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";



class BaseTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      user: null,
      groupID: null,
      userIsNew: true,
      personsInGroup: [],
    };
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {this.setState({activeTab: 1})}
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

    // get user data from database
    let users = this.props.database.ref('users');
    users.on('value', data => {
        var persons = [];
        var groupID = null;
        var currUser = this.state.user; // currUser.uid
        data.forEach(child => {
            persons.push(child.val());
            if (child.val().uid === currUser.uid)
              groupID = child.val().groupID;
        });
        var personsInGroup = persons.filter(person => {
          return person.groupID === groupID;
        });
        var userIsNew = (groupID == null || personsInGroup.length === 0);
        this.setState({
            userIsNew: userIsNew,
            groupID: groupID,
            personsInGroup: personsInGroup,
        });
    });
  }

  handleJoinedGroup() {
    this.setState({ userIsNew: false });
  }

  handleNavButtonClick(tab) {
    this.setState({
      activeTab: tab
    });
  }

  handleLogOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    // not logged in
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

    // logged in but not in group
    if (this.state.userIsNew) {
      return (
        <JoinScreen
          handleLogOut={() => this.handleLogOut()}
          user={this.state.user}
          database={this.props.database}
          handleJoinedGroup={() => this.handleJoinedGroup()}
        />
      );
    }

    return (
      <Media query="(max-width: 770px)">
          {matches => matches ?
              (
                  <Grid >
                      <Canvas
                            personsInGroup={this.state.personsInGroup}
                            groupID={this.state.groupID}
                            database={this.props.database}
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
                          personsInGroup={this.state.personsInGroup}
                          groupID={this.state.groupID}
                          database={this.props.database}
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
