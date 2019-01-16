import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import TaskItem from './TaskItem';
import TaskCreationForm from './TaskCreationForm';
import './index.scss';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskCreationActive: false,
    };
  }

  handleTaskCreateButtonPress() {
    this.setState({
      taskCreationActive: true,
    });
  }

  render() {

    const tasklist = (
        <div>
          <Button bsStyle="success" onClick={() => this.handleTaskCreateButtonPress()}>+</Button>
          <div className="TaskList">
              <h2>TaskList</h2>
              <TaskItem />
              <TaskItem />
              <TaskItem />
          </div>
        </div>
      );

    const taskform = <TaskCreationForm />;

    const pageToReturn = this.state.taskCreationActive ? taskform : tasklist;

    return(pageToReturn);
  }
}
