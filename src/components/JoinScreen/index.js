import React, {Component, Datetime} from 'react';
import {Grid, Row, Col, Button, FormControl, Form, Dropdown} from 'react-bootstrap';



export default class JoinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupScreen: 0,
      userName: this.props.user.displayName.split(" ")[0],
      age: 0,
      gender: "",
      ethnicity: "",
      relationship: "",
      groupName: 'My Group',
      groupID: null,
      groupCode: '',
      displayError: '',
      groupAdmin: '',
    };
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
    this.handleGroupCodeChange = this.handleGroupCodeChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleEthnicityChange = this.handleEthnicityChange.bind(this);
    this.handleRelationshipChange = this.handleRelationshipChange.bind(this);
  }

    componentDidMount() {
      let groupID = this.props.groupID;
      let groups = this.props.database.ref().child("groups");
      groups.on('value', data => {
        let groupAdmin = 0;
        let groupName = "None";
        data.forEach(elem => {
          if (elem.val().groupID === groupID) {
            groupAdmin = elem.val().groupAdmin;
            groupName = elem.val().groupName;
          }
        });
        this.setState({
          groupAdmin: groupAdmin,
          groupName: groupName,
        })
      });
    }

  handleDobChange(e) {
    this.setState({ age: e.target.value});
  }

  handleScreenState(s) {
    this.setState({
      groupScreen: s
    });
  }

  handleGroupNameChange(e) {
    this.setState({ groupName: e.target.value });
  }

  handleGroupCodeChange(e) {
    this.setState({ groupCode: e.target.value });
  }

  handleUserNameChange(e) {
    this.setState({ userName: e.target.value });
  }

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

  handleGenderChange(e) {
    this.setState({ gender: e.target.value });
  }

  handleEthnicityChange(e) {
    this.setState({ ethnicity: e.target.value });
  }

  handleRelationshipChange(e) {
    this.setState({ relationship: e.target.value });
  }

  handleCreateNewUser() {
    let newUser = {
      groupID: this.state.groupID,
      name: this.state.userName,
      uid: this.props.user.uid,
    };
    let updates = {};
    updates['/users/' + newUser.uid] = newUser;
    this.props.database.ref().update(updates);
    {/*
    if (this.props.user.uid !== )
    let newPartcipant = {
      groupID: this.state.groupID,
      name: this.state.userName,
      uid: this.props.user.uid,
      age: this.state.age,
      gender: this.state.gender,
      ethnicity: this.state.ethnicity,
      relationship: this.state.relationship,
    }
    let pupdates = {};
    pupdates['/participants/' + newPartcipant.uid] = newPartcipant;
    this.props.database.ref().update(pupdates);
  */}
    this.props.handleJoinedGroup();
  }

  handleCreateNewUser2() {
    let newUser = {
      groupID: this.state.groupID,
      name: this.state.userName,
      uid: this.props.user.uid,
    };
    let updates = {};
    updates['/users/' + newUser.uid] = newUser;
    this.props.database.ref().update(updates);
    let newPartcipant = {
      groupID: this.state.groupID,
      name: this.state.userName,
      uid: this.props.user.uid,
      age: this.state.age,
      gender: this.state.gender,
      ethnicity: this.state.ethnicity,
      relationship: this.state.relationship,
    }
    let pupdates = {};
    pupdates['/participants/' + newPartcipant.uid] = newPartcipant;
    this.props.database.ref().update(pupdates);
    this.props.handleJoinedGroup();
  }

  handleGroupCreation() {
    let ref = this.props.database.ref().child('groups/');
    let newGroupKey = ref.push().key;
    let newGroup = {
      groupAdmin: this.props.user.uid,
      groupID: newGroupKey,
      groupName: this.state.groupName
    };
    let updates = {};
    updates[newGroupKey] = newGroup;
    ref.update(updates);
    this.setState({
      groupID: newGroupKey,
      groupScreen: 3,
    });
  }

  handleGroupJoining() {
    let ref = this.props.database.ref().child('groups/');
    ref.on("value", (data) => {
      let groupID = null;
      data.forEach((child) => {
        let id = child.val().groupID;
        if (id.substr(id.length - 6).toLowerCase() === this.state.groupCode.toLowerCase())
          groupID = child.val().groupID;
      });
      if (groupID) {
        this.setState({
          groupID: groupID,
          groupScreen: 4,
        });
      }
      else { // error: could not find group
        this.setState({ displayError: 'Code invalid!' });
      }
    });
  }


  render() {
    var body;

    switch(this.state.groupScreen) {
      case 0:
        body = (
          <Row>
            <Row>
              <p><i style= {{ color: "black"}}>Sign up for studies offered on campus and get paid!</i></p>
            </Row>
            <Row>
              <h4 style= {{ color: "black"}}>Are you a:</h4>
            </Row>
            <Row id="Login">
              <Button onClick={() => this.handleScreenState(2)}>Participant</Button>
            </Row>
            <Row>
              <h4 style= {{ color: "black"}}> or </h4>
              <Button onClick={() => this.handleScreenState(1)}>Researcher</Button>
            </Row>
            <Row id="Login">
              <Button onClick={() => this.props.handleLogOut()}>Log Out</Button>
            </Row>
          </Row>
        );
        break;
      case 1: // creation
        body = (
          <Grid>
            <Row>
              <p style= {{ color: "black"}}>Sign up Below!</p>
              </Row>
              <FormControl
                autoFocus
                type="text"
                placeholder={"Enter your research department"}
                onChange={this.handleGroupNameChange}
              />
              {/*
            */}
            <Row style={{marginTop: 10}}>
              <Col xs={6}>
                <Button onClick={() => this.handleGroupCreation()}>Sign Up</Button>
              </Col>
              <Col xs={6}>
                <Button onClick={() => this.handleScreenState(0)}>Go Back</Button>
              </Col>
            </Row>
          </Grid>
        );
        break;
      case 2: // creation
        body = (
          <Grid>
            <Row>
              <p style= {{ color: "black"}}>Enter your <b>6-digit authentification code</b>:</p>
              <p style={{color: 'red'}}>{this.state.displayError}</p>
              <FormControl
                autoFocus
                type="text"
                placeholder={"Enter code here"}
                onChange={this.handleGroupCodeChange}
              />
            </Row>
            <Row style={{marginTop: 10}}>
              <Col xs={6}>
                <Button onClick={() => this.handleGroupJoining()}>Enter</Button>
              </Col>
              <Col xs={6}>
                <Button onClick={() => this.handleScreenState(0)}>Go Back</Button>
              </Col>
            </Row>
          </Grid>
        );
        break;
      case 3: // displayname
        body = (
          <Grid>
            <Row>
              <p style= {{ color: "black"}}>Give yourself a name and you're all set!</p>
              <FormControl
                autoFocus
                type="text"
                placeholder={"Name"}
                onChange={this.handleUserNameChange}
              />

              {/*
              <FormControl
                autoFocus
                type="text"
                placeholder={"Age"}
                onChange={this.handleAgeChange}
              />
              
              <FormControl
                autoFocus
                type="text"
                placeholder={"Gender"}
                onChange={this.handleGenderChange}
              />
              
              <FormControl
                autoFocus
                type="text"
                placeholder={"Ethnicity"}
                onChange={this.handleEthnicityChange}
              />
            
              <FormControl
                autoFocus
                type="text"
                placeholder={"Relationship staus"}
                onChange={this.handleRelationshipChange}
              />
              */}
            </Row>
            <Row style={{marginTop: 10}}>
              <Button onClick={() => this.handleCreateNewUser()}>Submit</Button>
            </Row>
          </Grid>
        );
        break;
      case 4: // displayname
        body = (
          <Grid>
            <Row>
              <p style= {{ color: "black"}}>Sign up below!</p>
              <p style= {{ color: "black", textAlign: "left"}}>Name:
              <FormControl
                autoFocus
                type="text"
                placeholder={"Name"}
                onChange={this.handleUserNameChange}
              /></p>
              <p style= {{ color: "black", textAlign: "left"}}>Date of birth:
              <FormControl
                  autoFocus
                  type="date"
                  value={this.state.dob}
                  placeholder={"Date of Birth"}
                  onChange={this.handleDobChange}
                /></p>
              <p style= {{ color: "black", textAlign: "left", paddingBottom: 0}}>Gender:
              <FormControl
                  componentClass="select"
                  placeholder={"Gender"}
                  onChange={this.handleGenderChange}
                  >
                   <option value="male">Male</option>
                  <option value="female">Female</option>
                </FormControl></p>
              <p style= {{ color: "black", textAlign: "left"}}>Ethnicity:
               <FormControl
                  componentClass= "select"
                  placeholder={"Ethnicity"}
                  onChange={this.handleEthnicityChange}
                  >
                   <option value="indian">American Indian or Alaska Native</option>
                  <option value="asian">Asian</option>
                  <option value="black">Black or African American</option>
                  <option value="hispanic">Hispanic or Latino</option>
                  <option value="white">White</option>
                  <option value="other">Native Hawaiin or Other Pacific Islander</option>
                </FormControl></p>
              <p style= {{ color: "black", textAlign: "left"}}>Relationship status:
              <FormControl
                componentClass="select"
                placeholder={"Relationship staus"}
                onChange={this.handleRelationshipChange}>
                <option value="single">Single</option>
                  <option value="married">Married</option>
              </FormControl></p>
            
            </Row>
            <Row style={{marginTop: 10}}>
              <Button onClick={() => this.handleCreateNewUser2()}>Submit</Button>
            </Row>
          </Grid>
        );
        break;
      default:
        body = "";
        break;
    };

    return(
      <Grid id="Login">
          <Row className="align-middle">
              <h2>Welcome to NU Lab Cats!</h2>
          </Row>
          <Row>
            <Col xs={1} />
            <Col xs={10}>
              {body}
            </Col>
          </Row>
      </Grid>
    );

  }

}
