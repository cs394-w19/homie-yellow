import React, { Component } from 'react';
import {Grid, Row, Button} from 'react-bootstrap';
import './index.css';


export default class Settings extends Component {
    render() {
        return(
            <Grid>
                <Row id="Logout">
                  <Button onClick={() => this.props.handleLogOut()}>Log Out </Button>
                </Row>
            </Grid>
          );
    }
}
