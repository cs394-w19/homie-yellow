import React, { Component } from 'react';
import {Row, Col, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';


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
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ taskName: e.target.value });
  }

  handleDescChange(e) {
    this.setState({ taskDescription: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ taskType: e.target.value });
  }

  handleDateChange(date) {
    this.setState({ taskDate: date });
  }

  handleRepeatChange(e) {
    let date = new Date();
    let riWeekly = [];
    let riMonthly = [];

    switch(e.target.value) {
      case "none":
        break;
      case "weekly":
        riWeekly = [date.getDay()];
        break;
      case "monthly":
        riMonthly = [date.getDate()];
        break;
      default:
        break;
    }

    this.setState({
      repeatInterval: e.target.value,
      riWeekly: riWeekly,
      riMonthly: riMonthly,
    });
  }

  handleSubmitButtonPress() {
    this.props.handleTaskCreation(Object.assign({}, this.state));
  }

  render() {
    return(
      <div className="TaskCreationForm">
        <h3 className="TaskCreationTitle">Create A New Task</h3>
          <form>
            <FormGroup controlId="taskName">
              <ControlLabel>Task Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter task"
                onChange={this.handleNameChange}
              />
            </FormGroup>

            <FormGroup controlId="taskDescription">
              <ControlLabel>Task Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Give a description of your task"
                onChange={this.handleDescChange}
              />
            </FormGroup>

            <Row>
              <Col xs={6}>
                <FormGroup controlId="taskType">
                  <ControlLabel>Task Type</ControlLabel>
                  <FormControl
                    componentClass="select"
                    onChange={this.handleTypeChange}
                  >
                    <option value="chore">Chore</option>
                    <option value="purchase">Purchase</option>
                    <option value="other">Other</option>
                  </FormControl>
                </FormGroup>
              </Col>

              <Col xs={6}>
                <FormGroup controlId="taskDate">
                  <ControlLabel>Due Date</ControlLabel>
                  <DatePicker className="date-picker"
                    selected={this.state.taskDate}
                    onChange={this.handleDateChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup controlId="taskRepeat">
              <ControlLabel>Repeat</ControlLabel>
              <FormControl
                componentClass="select"
                onChange={this.handleRepeatChange}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </FormControl>
            </FormGroup>

            <Button onClick={() => this.handleSubmitButtonPress()}>Create Task</Button>
          </form>
      </div>
    );
  }
}
