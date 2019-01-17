import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button} from 'react-bootstrap';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      let style = this.props.task.isComplete ? "success" : "default";
      return(
        <Row>
          <Col xs={10}>
            <h4>{this.props.task.taskName}</h4>
          </Col>
          <Col xs={2}>
            <Button 
              bsStyle={style}
              onClick={() => this.props.handleTaskCompleted()}
            ><Glyphicon glyph="ok"/></Button>
          </Col>
        </Row>
      );
    }
}
