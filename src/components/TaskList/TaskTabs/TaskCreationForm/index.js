import React, { Component } from 'react';
import {Row, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TaskAssignedToCheckboxes from './TaskAssignedToCheckboxes';
import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export default class TaskCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskID: this.props.taskID,
      taskName: '',
      taskType: this.props.type,
      taskCreator: this.props.user.uid,
      groupID: 0,
      taskModified: Date.now(),
      taskDescription: '',
      isComplete: false,
      assignedTo: [],
      repeatInterval: 'none',
      riWeekly: [],
      riMonthly: [],
      riTaskTime: Date.now(),
      taskDate: new Date(Date.now() + 86400),
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState(this.props.task);
      this.setState({
        taskDate: new Date(this.props.task.taskDate),
      });
    }
  }

  handleNameChange(e) {
    this.setState({ taskName: e.target.value });
  }

  handleDescChange(e) {
    this.setState({ taskDescription: e.target.value });
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
    this.props.handleTaskSubmission(Object.assign({}, this.state));
  }

  handleToggleAssignedPerson(person, task) {
    let assignedTo = [];
    if (task.assignedTo == null) {
      assignedTo.push(person.uid);
    } else if(task.assignedTo.includes(person.uid)) {
      task.assignedTo.splice(task.assignedTo.indexOf(person.uid), 1);
      assignedTo = task.assignedTo;
    } else {
      task.assignedTo.push(person.uid);
      assignedTo = task.assignedTo;
    }

    this.setState({
      assignedTo: assignedTo,
    });
  }

  render() {
    return(
      <div>
        <Card id="tabList">
          <CardContent
            className={this.props.type}
          >
            <Row>
              <Col xs={9}>
                <FormControl
                  type="text"
                  value={this.state.taskName}
                  placeholder={"Enter " + this.props.type + " name"}
                  onChange={this.handleNameChange}
                />
              </Col>
              <Col xs={3}>
                <Button bsStyle="success" onClick={() => this.handleSubmitButtonPress()}>Save</Button>
              </Col>
            </Row>
          </CardContent>
          <CardContent>
            <Row>
              <Col xs={12}>
                <TaskAssignedToCheckboxes
                  personsInGroup={this.props.personsInGroup}
                  toggleAssignedPerson={(person, task) => this.handleToggleAssignedPerson(person, task)}
                  database={this.props.database}
                  task={this.state}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <ControlLabel>Due Date</ControlLabel>
                <div>{"\n"}</div>
                <DatePicker className="date-picker"
                  selected={this.state.taskDate}
                  onChange={this.handleDateChange}
                />
              </Col>
              <Col xs={6}>
                <ControlLabel>Repeat</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={this.handleRepeatChange}
                  value={this.state.repeatInterval}
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ControlLabel>{this.props.type} Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  rows="5"
                  value={this.state.taskDescription}
                  placeholder={"Give a description of your " + this.props.type}
                  onChange={this.handleDescChange}
                />
              </Col>
            </Row>
          </CardContent>
        </Card>
      </div>
    );
  }
}
