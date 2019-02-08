import React, { Component } from 'react';
import {Grid, Row, Col, Button, ButtonToolbar} from 'react-bootstrap';
import './index.css';


export default class Settings extends Component {
    constructor(props) {
      super(props);
      this.state = {
        copied: false
      }
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

    render() {
        let groupID = this.props.groupID;
        if (!groupID) groupID = '000000';

        let copiedText = this.state.copied ? 'copied!' : 'tap to copy';

        return(
          <div>
              <Grid id="Settings">
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
                    <h2>Your Household</h2>
                  </Row>
                  <Row>
                    <p>Member</p>
                  </Row>
                  <Row>
                    <p>Member</p>
                  </Row>
                  <Row>
                    <p>Member</p>
                  </Row>
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
