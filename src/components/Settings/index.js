import React, { Component } from 'react';
import {Grid, Row, Button} from 'react-bootstrap';
import './index.css';


export default class Settings extends Component {

    handleLeaveGroup() {
      let ref = this.props.database.ref().child('users/');
      let updates = {};
      updates[this.props.user.uid + '/groupID'] = {};
      ref.update(updates);
    }

    render() {
        let groupID = this.props.groupID;

        return(
            <Grid>
                <Row id="Logout">
                  <p>Your name: {this.props.user.displayName}</p>
                  <p>Your uid: {this.props.user.uid}</p>
                  <p>Share this code with your friends to join: {groupID.substr(groupID.length - 6).toUpperCase()}</p>

                </Row>
                <Row id="Logout">
                  <Button onClick={() => this.handleLeaveGroup()}>Leave Group</Button>
                </Row>
                <Row id="Logout">
                  <Button onClick={() => this.props.handleLogOut()}>Log Out </Button>
                </Row>
            </Grid>
          );
    }
}
