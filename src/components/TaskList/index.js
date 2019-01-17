import React, { Component } from 'react';
import {Button, Glyphicon, Grid, Row, Col} from 'react-bootstrap';
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
      <Button bsStyle="success" id="addButton" onClick={() => this.handleTaskCreateButtonPress()} block><Glyphicon glyph="plus"/></Button>
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
        handleToggleAssignedPerson={(p, t) => this.handleToggleAssignedPerson(p, t)}
        handleToggleAssignedType={(p, t) => this.handleToggleAssignedType(p, t)}
      />
    );

    const tasklist = (
      <Grid >
        <Row className="TaskList">
          <Col xs={9}><h2> Task List </h2></Col>
          <Col xs={3}> {task_create_form} </Col>
        </Row>
        <Row>
          {task_tabs}
        </Row>
      </Grid>
      );

    let pageToReturn = tasklist;

    return(pageToReturn);
  }
}
