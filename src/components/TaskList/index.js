import React, { Component } from 'react';
import TaskItem from './TaskItem';
import './index.scss';

export default class TaskList extends Component {
  render() {
    return (
      <div className="TaskList">
          <h2>TaskList</h2>
          <TaskItem />
          <TaskItem />
          <TaskItem />
      </div>
    );
  }
}
