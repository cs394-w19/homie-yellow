import React, { Component } from "react";
import { Button, Glyphicon } from "react-bootstrap";
import TaskTabs from "./TaskTabs";
import "./index.scss";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      activeTab: 0,
      taskCreation: false,
      editorOpen: false
    };
  }

  componentDidMount() {
    let taskListRef = this.props.database.ref('taskList');
    taskListRef.on('value', snapshot => {
      this.setState({
        tasks: snapshot.val()
      });
    });
  }

  handleTaskCreateButtonPress(type) {
    this.setState({
      taskCreation: type
    });
  }

  handleTaskCreationClose() {
    this.setState({
      taskCreation: false,
      editorOpen: false
    });
  }

  handleTabPress(tab) {
    this.setState({
      activeTab: tab
    });
  }

  handleTaskSubmission(task) {
    let taskKeys = Object.keys(this.state.tasks);
    let taskKey =
      taskKeys.findIndex(x => x === task.taskID) !== -1
        ? task.taskID
        : this.props.database
            .ref()
            .child("taskList")
            .push().key;
    let submittedTask = {
      assignedTo: task.assignedTo,
      isDeleted: 0,
      groupID: task.groupID,
      isComplete: task.isComplete,
      paymentTotal: 0,
      repeatInterval: task.repeatInterval,
      riMonthly: task.riMonthly,
      riWeekly: task.riWeekly,
      taskCreator: task.taskCreator,
      taskDate: new Date(task.taskDate).getTime(),
      taskDescription: task.taskDescription,
      taskID: taskKey,
      taskModified: new Date(task.taskModified).getTime(),
      taskName: task.taskName,
      taskType: task.taskType
    };
    let updates = {};
    updates["/taskList/" + taskKey] = submittedTask;
    this.props.database.ref().update(updates);
    this.setState({
      taskCreation: false
    });
  }

  handleTaskCompleted(task) {
    let index = task.taskID;
    task.isComplete = !task.isComplete;
    let assignedTo = task.assignedTo == null ? [] : task.assignedTo;
    let riWeekly = task.riWeekly == null ? [] : task.riWeekly;
    let riMonthly = task.riMonthly == null ? [] : task.riMonthly;
    let updatedTask = {
      assignedTo: assignedTo,
      isDeleted: 0,
      groupID: task.groupID,
      isComplete: task.isComplete,
      paymentTotal: task.paymentTotal,
      repeatInterval: task.repeatInterval,
      riMonthly: riMonthly,
      riWeekly: riWeekly,
      taskCreator: task.taskCreator,
      taskDate: new Date(task.taskDate).getTime(),
      taskDescription: task.taskDescription,
      taskID: index,
      taskModified: Date.now(),
      taskName: task.taskName,
      taskType: task.taskType
    };
    let updates = {};
    updates["/taskList/" + index] = updatedTask;
    this.props.database.ref().update(updates);
  }

  handleDeleteTask(task) {
    let index = task.taskID;
    let assignedTo = task.assignedTo == null ? [] : task.assignedTo;
    let riWeekly = task.riWeekly == null ? [] : task.riWeekly;
    let riMonthly = task.riMonthly == null ? [] : task.riMonthly;
    let updatedTask = {
      assignedTo: assignedTo,
      isDeleted: 1,
      groupID: task.groupID,
      isComplete: task.isComplete,
      paymentTotal: task.paymentTotal,
      repeatInterval: task.repeatInterval,
      riMonthly: riMonthly,
      riWeekly: riWeekly,
      taskCreator: task.taskCreator,
      taskDate: new Date(task.taskDate).getTime(),
      taskDescription: task.taskDescription,
      taskID: index,
      taskModified: Date.now(),
      taskName: task.taskName,
      taskType: task.taskType
    };
    let updates = {};
    updates["/taskList/" + index] = updatedTask;
    this.props.database.ref().update(updates);
  }

  render() {
    let createTaskButtons = (
      <div>
        <Button
          id="addChoreButton"
          onClick={() => this.handleTaskCreateButtonPress("Chore")}
        >
          <Glyphicon glyph="plus" /> Chore
        </Button>
        <Button
          id="addPurchaseButton"
          onClick={() => this.handleTaskCreateButtonPress("Purchase")}
        >
          <Glyphicon glyph="plus" /> Purchase
        </Button>
      </div>
    );

    let task_tabs = (
      <TaskTabs
        user={this.props.user}
        tasks={this.state.tasks}
        database={this.props.database}
        personsInGroup={this.props.personsInGroup}
        activeTab={this.state.activeTab}
        taskCreation={this.state.taskCreation}
        handleTabPress={t => this.handleTabPress(t)}
        handleTaskSubmission={task => this.handleTaskSubmission(task)}
        handleTaskCompleted={task => this.handleTaskCompleted(task)}
        handleDeleteTask={t => this.handleDeleteTask(t)}
        handleTaskCreationClose={() => this.handleTaskCreationClose()}
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

    return pageToReturn;
  }
}
