import React, { Component } from 'react';
import './index.scss';

export default class NewTaskForm extends Component {
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