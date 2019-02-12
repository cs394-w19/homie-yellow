import React, { Component } from 'react';
import {Row, Col, Grid, Glyphicon, Button} from 'react-bootstrap';
import './index.scss';

export default class TaskHeader extends Component {
    render() {
      let task = this.props.task;
      let user = this.props.user;
      let style = task.isComplete ? "success" : "default";

      let assignedPeople = this.props.personsInGroup.filter(person => {
        if (!task.assignedTo) return false;
        return task.assignedTo.includes(person.uid);
      });
      let assignedTo = (task.assignedTo == null) ? "-" : assignedPeople.map(p => p.name).join(", ");

      let taskDate = new Date(1*task.taskDate).toDateString();
      taskDate = taskDate.substring(0, taskDate.length - 5);

      let showCompleteButton;

      if (user.uid === task.taskCreator) {
          showCompleteButton = (
            <Button
              className="pull-right"
              bsStyle={style}
              onClick={() => this.props.handleTaskCompleted()}
            >
              <Glyphicon glyph="ok"/>
            </Button>
          );
      };

      return(
        <Grid id="TaskHeader">
          <Col xs={9} md={10}>
            <Row>
              <h4 className="taskName">
                {this.props.task.taskName}
              </h4>
            </Row>
            <Row>
              <p className="taskPreview">
                <em>
                  <Glyphicon glyph="user"/> {assignedTo}
                </em>
              </p>
            </Row>
            <Row>
              <p className="taskPreview">
                <em>
                  <Glyphicon glyph="time"/> {taskDate}
                </em>
              </p>
            </Row>
          </Col>
          <Col xs={3} md={2} className="pull-right">
            {showCompleteButton}
          </Col>
        </Grid>
      );
    }
}
