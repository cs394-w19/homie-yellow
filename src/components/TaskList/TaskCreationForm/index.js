import React, { Component } from 'react';
import {Row, Col, Form, FormControl, FormGroup, ControlGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class TaskCreationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskDate: new Date(),
    }
    this.handleDateUpdate = this.handleDateUpdate.bind(this);
  }

  handleDateUpdate(date) {
    this.setState({
      taskDate: date
    });
  }

  render() {
    return(
      <div className="TaskCreationForm">
        <h3 className="TaskCreationTitle">Create A New Task</h3>
          <form>
            <FieldGroup
              id="taskName"
              type="text"
              label="Task Name"
              placeholder="Enter task"
            />
            <FormGroup controlId="taskDescription">
              <ControlLabel>Task Description</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Give a description of your task" />
            </FormGroup>
            <Row>

              <Col xs={6}>
                <FormGroup controlId="taskType">
                  <ControlLabel>Task Type</ControlLabel>
                  <FormControl componentClass="select">
                    <option value="chore">Chore</option>
                    <option value="purchase">Purchase</option>
                    <option value="other">Other</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup controlId="taskDate">
                  <ControlLabel>Date</ControlLabel>
                  <DatePicker className="date-picker"
                    selected={this.state.taskDate}
                    onChange={this.handleDateUpdate}
                  />
                </FormGroup>
              </Col>
            </Row>
          </form>
      </div>
    );
  }
}
