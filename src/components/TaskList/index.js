import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import TaskItem from './TaskItem';
import TaskCreationPage from './TaskCreationPage';
import './index.scss';

export default class TaskList extends Component {
  render() {
    return (
      <div>
        <Button bsStyle="success" href = "/NewTaskForm/index.js">+</Button>
      <div className="TaskList">
          <h2>TaskList</h2>
          <TaskItem />
          <TaskItem />
          <TaskItem />
      </div>
      </div>
    );
  }
}
