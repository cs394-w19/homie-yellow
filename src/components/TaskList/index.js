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

    let task_items = this.state.tasks.map((task) => {
      return(<TaskItem key={task.taskModified} task={task} />);
    });

    if (!task_items.length) task_items = <p>There are no tasks currently.</p>;

    const tasklist = (
        <div>
        <div class="float">
          <Button bsStyle="success" onClick={() => this.handleTaskCreateButtonPress()}>Add New Task +</Button>
          </div>
          <div className="TaskList">
              <h1>TaskList</h1>
              {task_items}
          </div>
        </div>
      );

    const taskform = <TaskCreationForm handleTaskCreation={(task) => this.handleTaskCreation(task)} />;

    const pageToReturn = this.state.activeScreen ? taskform : tasklist;

    return(pageToReturn);
  }
}
