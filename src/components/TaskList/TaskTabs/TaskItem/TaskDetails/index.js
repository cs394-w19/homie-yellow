import React, { Component } from 'react';
import {Checkbox, Radio, Row, Col, Glyphicon, Button} from 'react-bootstrap';


export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorOpen: 0,
    };
  }

  handleEditButton(menuNum, button) {
    if (button || (!button && this.state.editorOpen === 0))
    {
      if (this.state.editorOpen !== 0) menuNum = 0;
      this.setState({
        editorOpen: menuNum,
      });
    }
  }

  render() {
    // temporary list of people in the group
    let personsInGroup = ['Matt', 'Jenny', 'Dan'];
    let typesOfTasks = ['Chore', 'Purchase'];

    let t = this.props.task;

    let editButton = (num) => {
      return(
        <Button key={num} bsSize="xsmall" onClick={() => this.handleEditButton(num, true)}>
          <span>
            <Glyphicon glyph="pencil" />
          </span>
        </Button>
      );
    };

    let editTypeField = typesOfTasks.map((type) => {
      return(
        <span key={type}>
          <Radio
            name={type}
            inline
            onChange={() => this.props.handleToggleAssignedType(type, this.props.task)}
            checked={t.taskType === type}
          >
            {type}
          </Radio>{' '}
        </span>
      );
    });

    let editAssignedField = personsInGroup.map((person) => {
      let assigned = (t.assignedTo == null) ? '' : t.assignedTo.includes(person);
      return(
        <span
          key={person}
        >
          <Checkbox
            name={person}
            inline
            onChange={() => this.props.handleToggleAssignedPerson(person, this.props.task)}
            checked={assigned}
          >
            {person}
          </Checkbox>{' '}
        </span>
      );
    });

    let taskType = t.taskType;
    if (this.state.editorOpen === 1) {
      taskType = editTypeField;
    }

    let assignedTo = (t.assignedTo == null) ? "nobody." : t.assignedTo.join(", ");
    if (this.state.editorOpen === 2) {
      assignedTo = editAssignedField;
    } else {
      assignedTo = 'Assigned to ' + assignedTo;
    }

    return(
      <Row>
        <Col xs={12}>
          <p onClick={() => this.handleEditButton(1, false)}>{editButton(1)} &nbsp; {taskType}</p>
          <p onClick={() => this.handleEditButton(2, false)}>{editButton(2)}  &nbsp; {assignedTo}</p>
          <p><b>Due {new Date(1*t.taskDate).toDateString()}.</b> Repeat {t.repeatInterval}.</p>
          <p>{t.taskDescription}</p>
          <p>Created by {t.taskCreator}</p>
        </Col>
      </Row>
    );
  }
}
