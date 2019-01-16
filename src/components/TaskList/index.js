import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import TaskItem from './TaskItem';
import TaskCreationForm from './TaskCreationForm';
import QuickTaskCreate from './QuickTaskCreate';
import './index.scss';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeScreen: 0,
      taskCreation: false,
    };
  }

  handleTaskCreateButtonPress() {
    this.setState({
      taskCreation: true,
    });
  }

  handleTaskCreation(task) {
    let tasks = this.state.tasks.slice();
    tasks.unshift(task);
    this.setState({
      tasks: tasks,
      taskCreation: false,
    });
  }

  render() {

    let task_items = this.state.tasks.map((task) => {
      return(<TaskItem key={task.taskModified} task={task} />);
    });

    if (!task_items.length) task_items = <p>There are no tasks currently.</p>;

    let task_create_form = (
      <Button bsStyle="success" onClick={() => this.handleTaskCreateButtonPress()}>+</Button>
    );

    if (this.state.taskCreation) {
      task_create_form = (
        <QuickTaskCreate handleTaskCreation={(task) => this.handleTaskCreation(task)} />
      );
    }

    const tasklist = (
        <div>


          <div className="TaskList">
              <h1>TaskList</h1>
              {task_create_form}
              {task_items}
          </div>
        </div>
      );

    let pageToReturn = tasklist;

    return(pageToReturn);
  }
}
