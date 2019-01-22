import React, { Component } from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import QuickTaskCreate from './QuickTaskCreate';
import TaskTabs from './TaskTabs';
import './index.scss';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeTab: 0,
      taskCreation: false,
    };
  }

  componentWillMount() {
    let taskListRef = this.props.database.ref('taskList')
    taskListRef.once('value').then(snapshot => {
      console.log(snapshot.val());
      this.setState({
        tasks: snapshot.val()
      });
    });
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

    let newTaskKey = this.props.database.ref().child('taskList').push().key;
    let newTask = {
      assignedTo: task.assignedTo,
      isComplete: task.isComplete,
      paymentTotal: 0,
      repeatInterval: task.repeatInterval,
      riDaily: ' ',
      riMonthly: ' ',
      riWeekly: ' ',
      taskCreator: task.taskCreator,
      taskDate: task.taskDate,
      taskDescription: task.taskDescription,
      taskID: newTaskKey,
      taskModified: task.taskModified,
      taskName: task.taskName,
      taskType: task.taskType,
    }
    
    let updates = {};
    updates['/taskList/' + newTaskKey] = newTask;
    this.setState({
      tasks: this.props.tasks,
    });
    return this.props.database.ref().update(updates);
    
  }

  handleTaskCompleted(task) {
    let arrayIndex = this.state.tasks.findIndex((t) => {return t.taskID === task.taskID;});
    task.isComplete = !task.isComplete;
    task.taskModified = Date.now();
    let tasks = this.state.tasks.slice();
    tasks[arrayIndex] = task;
    this.setState({
      tasks: tasks,
    });
  }

  handleToggleAssignedType(type, task) {
    let tasks = this.state.tasks.slice();
    let index = tasks.findIndex((t) => {
      return t.taskID === task.taskID;
    });

    task.taskType = type;
    //task.taskModified = Date.now();
    tasks[index] = task;
    this.setState({
      tasks: tasks,
    });
  }

  handleToggleAssignedPerson(person, task) {
    let tasks = this.state.tasks.slice();
    let index = tasks.findIndex((t) => {
      return t.taskID === task.taskID;
    });

    if (task.assignedTo.includes(person)) {
      task.assignedTo.splice(task.assignedTo.indexOf(person), 1);
    } else {
      task.assignedTo.push(person);
    }
    //task.taskModified = Date.now();
    tasks[index] = task;
    this.setState({
      tasks: tasks,
    });
  }

  render() {

    let task_create_form = (
      <Button bsStyle="success" id="addButton" onClick={() => this.handleTaskCreateButtonPress()} ><Glyphicon glyph="plus"/></Button>
    );

    if (this.state.taskCreation) {
      task_create_form = (
        <QuickTaskCreate handleTaskCreation={(task) => this.handleTaskCreation(task)} />
      );
    }

    let task_tabs = (
      <TaskTabs
        tasks={this.state.tasks}
        database={this.props.database}
        activeTab={this.state.activeTab}
        handleTabPress={(t) => this.handleTabPress(t)}
        handleTaskCompleted={(task) => this.handleTaskCompleted(task)}
        handleToggleAssignedPerson={(p, t) => this.handleToggleAssignedPerson(p, t)}
        handleToggleAssignedType={(p, t) => this.handleToggleAssignedType(p, t)}
      />
    );

    const tasklist = (
      <div>
          <div className="TaskList">
              <h1>Task List</h1>
              {task_create_form}
              {task_tabs}
          </div>
        </div>
      );

    let pageToReturn = tasklist;

    return(pageToReturn);
  }
}
