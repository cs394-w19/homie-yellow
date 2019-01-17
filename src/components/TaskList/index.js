import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import TaskItem from './TaskItem';
import QuickTaskCreate from './QuickTaskCreate';
import TaskTabs from './TaskTabs';
import './index.scss';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.taskList,
      activeTab: 0,
      taskCreation: false,
    };
  }

  handleTaskCreateButtonPress() {
    this.setState({
      taskCreation: true,
    });
  }

  handleTabPress(tab) {
    this.setState({
      activeTab: tab,
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
  handleTaskCompleted(task) {
    let arrayIndex = this.state.tasks.findIndex((t) => {return t.taskID === task.taskID;});
    task.isComplete = !task.isComplete;
    let tasks = this.state.tasks.slice();
    tasks[arrayIndex] = task;
    this.setState({
      tasks: tasks,
    });
  }

  render() {

    let task_create_form = (
      <Button bsStyle="success" onClick={() => this.handleTaskCreateButtonPress()}>+</Button>
    );

    if (this.state.taskCreation) {
      task_create_form = (
        <QuickTaskCreate handleTaskCreation={(task) => this.handleTaskCreation(task)} />
      );
    }

    let task_tabs = (
      <TaskTabs 
        tasks={this.state.tasks}
        activeTab={this.state.activeTab}
        handleTabPress={(t) => this.handleTabPress(t)}
        handleTaskCompleted={(task) => this.handleTaskCompleted(task)}
      />
    );

    const tasklist = (
        <div>


          <div className="TaskList">
              <h1>TaskList</h1>
              {task_create_form}
              {task_tabs}
          </div>
        </div>
      );

    let pageToReturn = tasklist;

    return(pageToReturn);
  }
}
