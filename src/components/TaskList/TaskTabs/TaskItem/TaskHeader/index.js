import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button} from 'react-bootstrap';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      let task = this.props.task;

      let style = task.isComplete ? "success" : "default";

      let assignedTo = task.assignedTo.join(", ");
      if (!assignedTo.length) {
        assignedTo = '-';
      }

      let taskDate = new Date(1*task.taskDate).toDateString();

      return(
        <Row>
          <Col xs={5}>
            <h4>{this.props.task.taskName}</h4>
          </Col>
          <Col xs={5}>
            <small><em>
              <Glyphicon glyph="user"/> {assignedTo}<br />
              <Glyphicon glyph="time"/> {taskDate}
            </em></small>
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
