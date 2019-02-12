import React, { Component } from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import TaskAssignedToCheckboxes from "./TaskAssignedToCheckboxes";
import "./index.scss";
import "react-datetime/css/react-datetime.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";

export default class TaskCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      isDeleted: 0,
      paymentTotal: 0,
      taskType: this.props.type,
      taskCreator: this.props.user.uid,
      groupID: this.props.groupID,
      taskModified: Date.now(),
      taskDescription: "",
      isComplete: false,
      assignedTo: [],
      repeatInterval: "none",
      riWeekly: [],
      riMonthly: [],
      riTaskTime: Date.now(),
      taskDate: new Date(Date.now() + 86400)
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState(this.props.task);
      this.setState({
        taskDate: new Date(this.props.task.taskDate)
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

    switch (e.target.value) {
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
      riMonthly: riMonthly
    });
  }

  handleSubmitButtonPress() {
    this.props.handleTaskSubmission(Object.assign({}, this.state));
  }

  handleToggleAssignedPerson(person, task) {
    let assignedTo = [];
    if (task.assignedTo == null) {
      assignedTo.push(person.uid);
    } else if (task.assignedTo.includes(person.uid)) {
      task.assignedTo.splice(task.assignedTo.indexOf(person.uid), 1);
      assignedTo = task.assignedTo;
    } else {
      task.assignedTo.push(person.uid);
      assignedTo = task.assignedTo;
    }

    this.setState({
      assignedTo: assignedTo
    });
  }

  render() {
    return (
      <div>
        <Card id="tabList">
          <CardContent className={this.props.type}>
            <Row>
              <Col xs={3}>
                <Button
                  size="xs"
                  bsStyle="danger"
                  onClick={() => this.props.handleTaskCreationClose()}
                >
                  <small>X</small>
                </Button>
              </Col>
              <Col xs={5} className="pull-right">
                <Button
                  size="xs"
                  bsStyle="success"
                  onClick={() => this.handleSubmitButtonPress()}
                >
                  <small>Save</small>
                </Button>
              </Col>
            </Row>
        </CardContent>
        <CardContent>
            <Row>
              <Col xs={12}>
                <small><b>Task Name</b></small>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.taskName}
                  placeholder={"Enter " + this.props.type + " name"}
                  onChange={this.handleNameChange}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <small><b>Due Date</b></small>
                <Datetime
                  value={this.state.taskDate}
                  onChange={this.handleDateChange}
                />
              </Col>
              <Col xs={12} md={6}>
                <small><b>Repeat</b></small>
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
              <Col xs={12}>
              <small><b>Task Assigned To</b></small>
                <TaskAssignedToCheckboxes
                  personsInGroup={this.props.personsInGroup}
                  toggleAssignedPerson={(person, task) =>
                    this.handleToggleAssignedPerson(person, task)
                  }
                  database={this.props.database}
                  task={this.state}
                />
              </Col>
              <Col xs={12}>
                <small><b>{this.props.type} Description</b></small>
                <FormControl
                  componentClass="textarea"
                  rows="3"
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
TaskCreationForm.propTypes = {
  classes: PropTypes.object.isRequired
};
