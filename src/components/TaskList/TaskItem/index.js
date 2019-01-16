import React, { Component } from 'react';
import TaskHeader from './TaskHeader';
import TaskDetails from './TaskDetails';
import './index.scss';

export default class TaskItem extends Component {
    render() {
      return(
        <div className="TaskItem">
          <TaskHeader task={this.props.task} />
          <TaskDetails task={this.props.task} />
        </div>
      );
    }
}
