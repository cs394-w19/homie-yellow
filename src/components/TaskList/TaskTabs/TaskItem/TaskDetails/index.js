import React, { Component } from 'react';
import {Row, Col, Glyphicon, Button} from 'react-bootstrap';


export default class TaskDetails extends Component {

  render() {
    // temporary list of people in the group
    let t = this.props.task;
    let assignedTo = (t.assignedTo == null) ? "Nobody" : t.assignedTo.join(', ');

    return(
      <Row>
        <Col xs={10}>
          <p>{t.taskType}</p>
          <p>Assigned to {assignedTo}</p>
          <p><b>Due {new Date(1*t.taskDate).toDateString()}.</b> Repeat {t.repeatInterval}.</p>
          <p>{t.taskDescription}</p>
          <p>Created by {t.taskCreator}</p>
        </Col>
        <Col xs={2}>
        <Button bsSize="small" onClick={() => this.props.handleEditTask()}>
          <span>
            <Glyphicon glyph="pencil" />
          </span>
        </Button>
        <Button bsSize="small" onClick={() => this.props.handleDeleteTask(t)}>
          <span>
            <Glyphicon glyph="trash" />
          </span>
        </Button>
        </Col>
      </Row>
    );
  }
}
