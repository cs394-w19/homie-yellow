import React, { Component } from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import TaskTabs from './TaskTabs';
import './index.scss';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeTab: 0,
      taskCreation: 0,
      personsInGroup: [],
    };
  }

  componentWillMount() {
    let taskListRef = this.props.database.ref('taskList');
    taskListRef.once('value').then(snapshot => {
      console.log(snapshot.val());
      this.setState({
        tasks: snapshot.val()
      });
    });

    let users = this.props.database.ref('users');
    users.once("value").then(data => {
        var persons = [];
        data.forEach((child) => {
            persons.push(child.val().name);
        });
        this.setState({
            personsInGroup: persons,
        });
    });
    
  }

  handleTaskCreateButtonPress(type) {
    this.setState({
      taskCreation: type,
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
      isDeleted: 0,
      isComplete: task.isComplete,
      paymentTotal: 0,
      repeatInterval: task.repeatInterval,
      riDaily: ' ',
      riMonthly: ' ',
      riWeekly: ' ',
      taskCreator: task.taskCreator,
      taskDate: Date.now() + 86400,
      taskDescription: task.taskDescription,
      taskID: newTaskKey,
      taskModified: task.taskModified,
      taskName: task.taskName,
      taskType: task.taskType,
    }
    let updates = {};
    updates['/taskList/' + newTaskKey] = newTask;
    this.props.database.ref().update(updates);
    this.setState({
      tasks: this.state.tasks,
      taskCreation: false,
    });

  }

  handleTaskCompleted(task) {
    let index = task.taskID;
    task.isComplete = !task.isComplete;
    let assignedTo = (task.assignedTo == null) ? [] : task.assignedTo;
    let updatedTask = {
      assignedTo: assignedTo,
      isDeleted: 0,
      isComplete: task.isComplete,
      paymentTotal: task.paymentTotal,
      repeatInterval: task.repeatInterval,
      riDaily: task.riDaily,
      riMonthly: task.riMonthly,
      riWeekly: task.riWeekly,
      taskCreator: task.taskCreator,
      taskDate: task.taskDate,
      taskDescription: task.taskDescription,
      taskID: index,
      taskModified: Date.now(),
      taskName: task.taskName,
      taskType: task.taskType,
    }
    let updates = {};
    updates['/taskList/' + index] = updatedTask;
    this.props.database.ref().update(updates);
    this.setState({
      tasks: this.state.tasks,
    });
  }

  handleToggleAssignedType(type, task) {
    let index = task.taskID;
    task.taskType = type;
    let assignedTo = (task.assignedTo == null) ? [] : task.assignedTo;
    let updatedTask = {
      assignedTo: assignedTo,
      isDeleted: 0,
      isComplete: task.isComplete,
      paymentTotal: task.paymentTotal,
      repeatInterval: task.repeatInterval,
      riDaily: task.riDaily,
      riMonthly: task.riMonthly,
      riWeekly: task.riWeekly,
      taskCreator: task.taskCreator,
      taskDate: task.taskDate,
      taskDescription: task.taskDescription,
      taskID: index,
      taskModified: Date.now(),
      taskName: task.taskName,
      taskType: task.taskType,
    }
    let updates = {};
    updates['/taskList/' + index] = updatedTask;
    this.props.database.ref().update(updates);
    this.setState({
      tasks: this.state.tasks,
    });
  }

  handleToggleAssignedPerson(person, task) {
    let index = task.taskID;
    let assignedTo = [];
    if (task.assignedTo == null) {
      assignedTo.push(person);
    } else if(task.assignedTo.includes(person)) {
      task.assignedTo.splice(task.assignedTo.indexOf(person), 1);
      assignedTo = task.assignedTo;
    } else {
      task.assignedTo.push(person);
      assignedTo = task.assignedTo;
    }


    let updatedTask = {
      assignedTo: assignedTo,
      isDeleted: 0,
      isComplete: task.isComplete,
      paymentTotal: task.paymentTotal,
      repeatInterval: task.repeatInterval,
      riDaily: task.riDaily,
      riMonthly: task.riMonthly,
      riWeekly: task.riWeekly,
      taskCreator: task.taskCreator,
      taskDate: task.taskDate,
      taskDescription: task.taskDescription,
      taskID: index,
      taskModified: Date.now(),
      taskName: task.taskName,
      taskType: task.taskType,
    }
    let updates = {};
    updates['/taskList/' + index] = updatedTask;
    this.props.database.ref().update(updates);
    this.setState({
      tasks: this.state.tasks,
    });

  }

  handleDeleteTask(task) {
    let index = task.taskID;
    let assignedTo = (task.assignedTo == null) ? [] : task.assignedTo;
    let updatedTask = {
      assignedTo: assignedTo,
      isDeleted: 1,
      isComplete: task.isComplete,
      paymentTotal: task.paymentTotal,
      repeatInterval: task.repeatInterval,
      riDaily: task.riDaily,
      riMonthly: task.riMonthly,
      riWeekly: task.riWeekly,
      taskCreator: task.taskCreator,
      taskDate: task.taskDate,
      taskDescription: task.taskDescription,
      taskID: index,
      taskModified: Date.now(),
      taskName: task.taskName,
      taskType: task.taskType,
    }
    let updates = {};
    updates['/taskList/' + index] = updatedTask;
    this.props.database.ref().update(updates);
    this.setState({
      tasks: this.state.tasks,
    });
  }

  render() {

    let createTaskButtons = (
      <div>
        <Button
          id="addChoreButton"
          onClick={() => this.handleTaskCreateButtonPress('Chore')}
        >
          <Glyphicon glyph="plus" /> Chore
        </Button>
        <Button
          id="addPurchaseButton"
          onClick={() => this.handleTaskCreateButtonPress('Purchase')}
        >
          <Glyphicon glyph="plus" /> Purchase
        </Button>
      </div>
    );

    let task_tabs = (
      <TaskTabs
        taskCreation={this.state.taskCreation}
        tasks={this.state.tasks}
        database={this.props.database}
        personsInGroup={this.state.personsInGroup}
        activeTab={this.state.activeTab}
        handleTabPress={(t) => this.handleTabPress(t)}
        handleTaskCreation={(task) => this.handleTaskCreation(task)}
        handleTaskCompleted={(task) => this.handleTaskCompleted(task)}
        handleToggleAssignedPerson={(p, t) => this.handleToggleAssignedPerson(p, t)}
        handleToggleAssignedType={(p, t) => this.handleToggleAssignedType(p, t)}
        handleDeleteTask={(t) => this.handleDeleteTask(t)}
      />
    );

    const tasklist = (
      <div>
          <div className="TaskList">
              <h1>Task List</h1>
              {createTaskButtons}
              {task_tabs}
          </div>
        </div>
      );

    let pageToReturn = tasklist;

    return(pageToReturn);
  }
}
