import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';


export default class TaskDetails extends Component {
  render() {
    let t = this.props.task;

    let assignedTo = t.assignedTo.join(", ");
    if (!assignedTo.length) assignedTo = 'nobody';

    return(
      <Row>
        <Col xs={12}>
          <p><i>{t.taskType} | assigned to {assignedTo}</i></p>
          <p><b>Due date: {new Date(1*t.taskDate).toDateString()}, Repeat {t.repeatInterval}.</b></p>
          <p>{t.taskDescription}</p>
          <p>Created by {t.taskCreator}; last modified on {new Date(1*t.taskModified).toDateString()}.</p>   
        </Col>
      </Row>
    );
  }
}
