import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import TaskItem from './TaskItem';
import TaskCreationForm from './TaskCreationForm';
import './index.scss';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeScreen: 0,
    };
  }

  handleTaskCreateButtonPress() {
    this.setState({
      activeScreen: 1,
    });
  }

  handleTaskCreation(task) {
    let tasks = this.state.tasks.slice();
    tasks.push(task);
    this.setState({
      tasks: tasks,
      activeScreen: 0,
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

    const taskform = <TaskCreationForm handleTaskCreation={(task) => this.handleTaskCreation(task)} />;

    const pageToReturn = this.state.activeScreen ? taskform : tasklist;

    return(pageToReturn);
  }
}
