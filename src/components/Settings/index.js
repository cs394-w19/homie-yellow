import React, { Component } from 'react';
import {Grid, Row, Button} from 'react-bootstrap';


export default class Settings extends Component {
    render() {
        return(
            <Grid>
                <Row>
                  <Button onClick={() => this.props.handleLogOut()}>Log Out </Button>
                </Row>
            </Grid>
          );
    }
}
