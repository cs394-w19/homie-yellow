import React, { Component } from "react";
import { Row, Col, Glyphicon, Button } from "react-bootstrap";

export default class TaskDetails extends Component {
  render() {
    // temporary list of people in the group
    let t = this.props.task;

    let assignedPeople = this.props.personsInGroup.filter(person => {
      if (!t.assignedTo) return false;
      return t.assignedTo.includes(person.uid);
    });
    let assignedTo =
      t.assignedTo == null
        ? "nobody"
        : assignedPeople.map(p => p.name).join(", ");

    let taskCreator = this.props.personsInGroup.find(person => {
      return person.uid === t.taskCreator;
    });
    if (taskCreator === undefined) {
      taskCreator = { name: "[deleted]" };
    }

    return (
      <div>
        <Row>
          <Col xs={12}>
            <p>
              <small>
                <b>Due {new Date(1 * t.taskDate).toDateString()}.</b> Repeat{" "}
                {t.repeatInterval}.
              </small>
            </p>
            <p>{t.taskDescription}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>
              <small>
                <i>
                  {t.taskType} assigned to {assignedTo}. Created by{" "}
                  {taskCreator.name}.
                </i>
              </small>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={7} sm={9} md={10} lg={11} />
          <Col xs={5} sm={3} md={2} lg={1}>
            <Button bsSize="small" onClick={() => this.props.handleEditTask()}>
              <span>
                <Glyphicon glyph="pencil" />
              </span>
            </Button>
            <Button
              bsSize="small"
              onClick={() => this.props.handleDeleteTask(t)}
            >
              <span>
                <Glyphicon glyph="trash" />
              </span>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
