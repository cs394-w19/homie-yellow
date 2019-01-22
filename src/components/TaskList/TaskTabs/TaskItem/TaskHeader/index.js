import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button} from 'react-bootstrap';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      let task = this.props.task;
      let style = task.isComplete ? "success" : "default";
      let assignedTo = (task.assignedTo == null) ? "-" : task.assignedTo.join(", ");

      let taskDate = new Date(1*task.taskDate).toDateString();

      return(
        <Row>
          <Col xs={5}>
            <h4 className="taskName">{this.props.task.taskName}</h4>
          </Col>
          <Col xs={4}>
            <p className="taskPreview"><em>
              <Glyphicon glyph="user"/> {assignedTo}<br />
              <Glyphicon glyph="time"/> {taskDate}
            </em></p>
          </Col>
          <Col xs={3}>
            <center><Button
              block
              bsStyle={style}
              onClick={() => this.props.handleTaskCompleted()}
            ><Glyphicon glyph="ok"/></Button></center>
          </Col>
        </Row>
      );
    }
}
