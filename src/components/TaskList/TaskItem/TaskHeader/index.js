import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button} from 'react-bootstrap';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      let style = this.props.task.isComplete ? "success" : "default";
      let assignedTo = this.props.task.assignedTo.join(", ");
      if (!assignedTo.length) {
        assignedTo = '';
      } else {
        assignedTo = 'Assigned to ' + assignedTo;
      }
      return(
        <Row>
          <Col xs={5}>
            <h4>{this.props.task.taskName}</h4>
          </Col>
          <Col xs={5}>
            <small><em> {assignedTo} </em></small>
          </Col>
          <Col xs={2}>
            <Button 
              block
              bsStyle={style}
              onClick={() => this.props.handleTaskCompleted()}
            ><Glyphicon glyph="ok"/></Button>
          </Col>
        </Row>
      );
    }
}
