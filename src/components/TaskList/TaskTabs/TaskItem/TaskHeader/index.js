import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button, Grid} from 'react-bootstrap';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      let task = this.props.task;
      let style = task.isComplete ? "success" : "default";
      let assignedTo = (task.assignedTo == null) ? "-" : task.assignedTo.join(", ");

      let taskDate = new Date(1*task.taskDate).toDateString();
      taskDate = taskDate.substring(0, taskDate.length - 5);

      return(
          <Row>
            <Col xs={9}>
              <Row>
                <h4 className="taskName">{this.props.task.taskName}</h4>
              </Row>
              <Row>
                <Col xs={6}>
                  <p className="taskPreview">
                    <em>
                    <Glyphicon glyph="user"/> {assignedTo}
                    </em>
                  </p>
                </Col>
                <Col xs={6}>
                  <p className="taskPreview">
                    <em>
                    <Glyphicon glyph="time"/> {taskDate}
                    </em>
                  </p>
                </Col>
              </Row>
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
