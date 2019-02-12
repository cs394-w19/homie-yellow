import React, { Component } from 'react';
import {Grid, Row, Col, Button, ButtonToolbar} from 'react-bootstrap';
import './index.css';


export default class Settings extends Component {
    constructor(props) {
      super(props);
      this.state = {
        copied: false,
        groupAdmin: 0,
        groupName: "None",
        role: "None"
      }
    }

    componentDidMount() {
    	let groupID = this.props.groupID;
    	let personsInGroup = this.props.personsInGroup;
    	let groups = this.props.database.ref().child("groups");
	    groups.on('value', data => {
	      let groupAdmin = 0;
	      let groupName = "None";
	      data.forEach(elem => {
	      	console.log(elem.val());
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

    handleLeaveGroup() {
      let ref = this.props.database.ref().child('users/');
      let updates = {};
      updates[this.props.user.uid + '/groupID'] = {};
      ref.update(updates);
    }

    handleShareCodeButtonClicked() {
      const el = document.createElement('textarea');
      el.value = this.props.groupID;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.setState({ copied: true });
      return;
    }

    checkIfAdmin() {
    	let groupAdmin = this.state.groupAdmin;
    	if(this.props.user.uid === groupAdmin){
    		return "(Admin)";
    	} else {
    		return "(Member)";
    	}
    }

    render() {
    	let groupID = this.props.groupID;
    	let personsInGroup = this.props.personsInGroup;

		let groupAdmin = this.state.groupAdmin;
		let groupName = this.state.groupName;
	    let role = this.checkIfAdmin();

	    let groupMembers = []
    	personsInGroup.forEach(elem => {
    		groupMembers.push(elem.name);
    	});
    	let groupMembersList = groupMembers.join(", ");

    	if (!groupID) groupID = '000000';

    	let copiedText = this.state.copied ? 'copied!' : 'tap to copy';

        return(
          <div id="Settings">
              <Grid>
                <Col xs={12} m={8}>
                  <Row>
                    <h1>Hello, {this.props.user.displayName.split(" ")[0]}!</h1>
                  </Row>
                  <Row>
                    <h2>Invitation code</h2>
                    <p>Share this code with anyone you want to join your household.</p>
                    <Col onClick={() => this.handleShareCodeButtonClicked()} id="group-join-code">
                      {groupID.substr(groupID.length - 6).toUpperCase()}
                    </Col>
                    <center id="faded">{copiedText}</center>
                  </Row>
                </Col>
                <Col xs={12} m={8}>
                  <Row>
                  	<h2>Group Information</h2>
                  </Row>
                  <p>Your name: {this.props.user.displayName.split(" ")[0]} {role}</p>
                  <p>Group Name: {groupName}</p>
                  <p>Group ID: {groupID.substr(groupID.length - 6).toUpperCase()}</p>
                  <p>Group Members: {groupMembersList}</p>
                </Col>
              </Grid>
              <Grid>
                <Row id="admin-buttons">
                  <Col xs={6} m={6}>
                      <Button onClick={() => this.handleLeaveGroup()}>Leave Group</Button>
                  </Col>
                  <Col xs={6} m={6}>
                      <Button onClick={() => this.props.handleLogOut()}>Log Out </Button>
                  </Col>
                </Row>
              </Grid>
            </div>
          );
    }
}
