import React, { Component } from 'react';
import {Checkbox, Radio, Row, Col, Glyphicon, Button} from 'react-bootstrap';


export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorOpen: 0,
    };
  }

  handleEditButton(menuNum) {
    if (this.state.editorOpen === menuNum) menuNum = 0;
    this.setState({
      editorOpen: menuNum,
    });
  }

  render() {
    // temporary list of people in the group
    let personsInGroup = ['Matt', 'Jenny', 'Dan'];
    let typesOfTasks = ['Chore', 'Purchase'];

    let t = this.props.task;

    let editButton = (num) => {
      return(
        <Button key={num} bsSize="xsmall" onClick={() => this.handleEditButton(num)}>
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
      return(
        <span key={person}>
          <Checkbox
            name={person}
            inline
            onChange={() => this.props.handleToggleAssignedPerson(person, this.props.task)}
            checked={t.assignedTo.includes(person)}
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

    let assignedTo = t.assignedTo.join(", ");
    if (this.state.editorOpen === 2) {
      assignedTo = editAssignedField;
    } else if (!assignedTo.length) {
      assignedTo = 'Assigned to nobody.';
    } else {
      assignedTo = 'Assigned to ' + assignedTo;
    }

    return(
      <Row>
        <Col xs={12}>
          <p>{editButton(1)} &nbsp; {taskType}</p>
          <p>{editButton(2)}  &nbsp; {assignedTo}</p>
          <p><b>Due {new Date(1*t.taskDate).toDateString()}.</b> Repeat {t.repeatInterval}.</p>
          <p>{t.taskDescription}</p>
          <p>Created by {t.taskCreator}</p>
        </Col>
      </Row>
    );
  }
}
