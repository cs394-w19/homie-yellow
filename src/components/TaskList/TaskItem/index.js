import React, { Component } from 'react';
import TaskHeader from './TaskHeader';
import TaskDetails from './TaskDetails';
import './index.scss';

export default class TaskItem extends Component {
    render() {
      return(
        <div className="TaskItem">
          <h3>TaskItem</h3>
          <TaskHeader />
          <TaskDetails />
        </div>
      );
    }
}
