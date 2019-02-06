import React, { Component } from 'react';
import {Grid, Row, Button} from 'react-bootstrap';
import './index.css';


export default class Settings extends Component {
    render() {
        return(
            <Grid>
                <Row id="Logout">
                  <p>Your name: {this.props.user.displayName}</p>
                  <p>Your uid: {this.props.user.uid}</p>
                  <p>Your groupID: {this.props.groupID}</p>

                </Row>
                <Row id="Logout">
                  <Button onClick={() => this.props.handleLogOut()}>Log Out </Button>
                </Row>
            </Grid>
          );
    }
}
