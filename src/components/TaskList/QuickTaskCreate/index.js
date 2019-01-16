import React, { Component } from 'react';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

import './index.scss';


export default class TaskCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      taskType: 'chore',
      taskCreator: 'Jenny',
      taskModified: new Date(),
      taskDescription: '',
      status: false,
      assignedTo: 'nobody',
      repeatInterval: 'none',
      riWeekly: [],
      riMonthly: [],
      riTaskTime: new Date(),
      taskDate: new Date(),
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ taskName: e.target.value });
  }

  handleSubmitButtonPress() {
    this.props.handleTaskCreation(Object.assign({}, this.state));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmitButtonPress();
    }
  }

  render() {
    return(
      <div className="TaskCreationForm">
        <FormControl autoFocus
          type="text"
          placeholder="Enter task name"
          onChange={this.handleNameChange}
          onKeyPress={(e) => this.handleKeyPress(e)}
        />
      </div>
    );
  }
}
