import React, {Component} from 'react';
import {Grid, Row, Button, FormControl} from 'react-bootstrap';



export default class JoinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupScreen: 0,
      groupName: 'My Group',
    };
    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
  }

  handleScreenState(s) {
    this.setState({
      groupScreen: s
    });
  }

  handleGroupNameChange(e) {
    this.setState({ groupName: e.target.value });
  }

  handleCreateNewUser(user, groupID, birthday) {
    let newUser = {
      birthday: birthday,
      groupID: groupID,
      name: user.displayName.split(" ")[0],
      uid: user.uid
    };
    let updates = {};
    updates['/users/' + user.uid] = newUser;
    console.log(this.props.database);
    this.props.database.ref().update(updates);
  }

  handlegroupCreation() {
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
    this.handleCreateNewUser(this.props.user, newGroupKey, 0);
    this.props.handleJoinedGroup();
  }

  render() {
    var body;

    switch(this.state.groupScreen) {
      case 0:
        body = (
          <Row>
            <Row>
              <Button onClick={() => this.handleScreenState(1)}>Create a Group</Button>
            </Row>
            <Row>
              <Button onClick={() => this.handleScreenState(2)}>Join an existing Group</Button>
            </Row>
          </Row>
        );
        break;
      case 1: // creation
        body = (
          <Row>
            <p>Give your group a name and you're all set!</p>
            <FormControl
              type="text"
              placeholder={"Enter group name"}
              onChange={this.handleGroupNameChange}
            />
            <Button onClick={() => this.handlegroupCreation()}>Create Group</Button>
            <Button onClick={() => this.handleScreenState(0)}>Go Back</Button>
          </Row>
        );
        break;
      case 2: // creation
        body = (
          <Row>
            <p>This is a form for joining a group.</p>
            <Button onClick={() => this.handleScreenState(0)}>Go Back</Button>
          </Row>
        );
        break;
      default:
        body = "";
        break;
    };

    return(
      <Grid id="Login">
          <Row className="align-middle">
            <h2>Welcome to Homie!</h2>
          </Row>
          {body}
      </Grid>
    );

  }

}
